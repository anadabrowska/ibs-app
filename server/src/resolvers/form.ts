import { Form } from "../entities/form";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
  UseMiddleware,
  Query,
} from "type-graphql";
import { getConnection } from "typeorm";

@InputType()
class ActivityInput {
  @Field()
  type: string;
  @Field()
  moodAfter: number;
  @Field()
  time: number;
}

@InputType()
class SymptomInput {
  @Field()
  name: string;
  @Field()
  intensity: number;
  @Field({ nullable: true })
  isDangerous?: boolean;
}

@InputType()
class FormInput {
  @Field()
  generalFeeling: number;
  @Field()
  weight: number;
  @Field(() => [SymptomInput], { nullable: true })
  symptoms?: SymptomInput[];
  @Field()
  stoolType: number;
  @Field()
  sleepLenght: number;
  @Field()
  sleepQuality: number;
  @Field()
  mood: number;
  @Field()
  stress: number;
  @Field(() => [ActivityInput], { nullable: true })
  activities?: ActivityInput[];
  @Field()
  inTherapy: boolean;
  @Field({ nullable: true })
  menstruation?: boolean;
  @Field()
  migraine: boolean;
  @Field()
  pollakiuria: boolean;
  @Field({ nullable: true })
  notes?: string;
}

@Resolver()
export class FormResover {
  @Mutation(() => Form)
  @UseMiddleware(isAuth)
  async createForm(
    @Arg("input") input: FormInput,
    @Ctx() { req }: Context
  ): Promise<Form> {
    const form = await Form.create({
      ...input,
      creatorId: req.session.userId,
    }).save();

    return form;
  }

  @Query(() => [Form], { nullable: true })
  @UseMiddleware(isAuth)
  async formsFromTimeRange(
    @Arg("before") before: string,
    @Arg("after") after: string
  ): Promise<Form[] | undefined> {
    const result: Form[] | undefined = await getConnection()
      .getRepository(Form)
      .createQueryBuilder("form")
      .where("form.createdAt < :before", {
        before: new Date(before),
      })
      .andWhere("form.createdAt >= :after", {
        after: new Date(after),
      })
      .getMany();

    return result;
  }
}
