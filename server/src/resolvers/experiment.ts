import { Experiment } from "../entities/experiment";
import { isAuth } from "../middleware/isAuth";
import { validateExperiment } from "../utils/experimentValidation";
import {
  Resolver,
  Query,
  Field,
  InputType,
  ObjectType,
  Arg,
  Ctx,
  Mutation,
  UseMiddleware,
  Int,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Context } from "vm";
import { FieldError } from "./User";

@InputType()
class StartExperimentInput {
  @Field()
  productName: string;
}

@InputType()
export class EndExperimentInput {
  @Field()
  productName: string;
  @Field({ nullable: true })
  isTolerable?: boolean;
  @Field({ nullable: true })
  notes?: string;
  @Field({ nullable: true })
  quantity?: string;
}

@ObjectType()
class ExperimentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Experiment, { nullable: true })
  experiment?: Experiment;
}

@Resolver()
export class ExperimentResover {
  @Mutation(() => ExperimentResponse)
  @UseMiddleware(isAuth)
  async startExperiment(
    @Arg("input") input: StartExperimentInput,
    @Ctx() { req }: Context
  ): Promise<ExperimentResponse> {
    if (input.productName === "") {
      return {
        errors: [
          {
            fieldName: "productName",
            message:
              "You need to pass the name of the product you want to make an experiment on",
          },
        ],
      };
    }
    const experiment = await Experiment.create({
      ...input,
      creatorId: (req.session as any).userId,
    }).save();

    return { experiment };
  }
  @Mutation(() => ExperimentResponse)
  @UseMiddleware(isAuth)
  async endExperiment(
    @Arg("input") input: EndExperimentInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<ExperimentResponse> {
    const errors = validateExperiment(input);
    if (errors) {
      return errors;
    }

    console.log(new Date().toISOString());

    const finishedExperiment = await getConnection()
      .createQueryBuilder()
      .update(Experiment)
      .set({
        ...input,
        endDate: new Date().toISOString(),
      })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: (req.session as any).userId,
      })
      .returning("*")
      .execute();

    const experiment: Experiment = finishedExperiment.raw[0];

    return { experiment };
  }
  @Query(() => [Experiment], { nullable: true })
  @UseMiddleware(isAuth)
  async openExperiments(
    @Ctx() { req }: Context
  ): Promise<Experiment[] | undefined> {
    const experiments: Experiment[] | undefined = await getConnection()
      .getRepository(Experiment)
      .createQueryBuilder("experiment")
      .where(`experiment.endDate IS NULL and "creatorId" = :creatorId`, {
        creatorId: (req.session as any).userId,
      })
      .getMany();
    return experiments;
  }
  @Query(() => [Experiment], { nullable: true })
  @UseMiddleware(isAuth)
  async closedExperiments(
    @Ctx() { req }: Context
  ): Promise<Experiment[] | undefined> {
    const experiments: Experiment[] | undefined = await getConnection()
      .getRepository(Experiment)
      .createQueryBuilder("experiment")
      .where(`experiment.endDate IS NOT NULL and "creatorId" = :creatorId`, {
        creatorId: (req.session as any).userId,
      })
      .getMany();
    return experiments;
  }
}
