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
import { Activity } from "../entities/activity";
import { Symptom } from "../entities/symptom";

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
  dayRate: number;
  @Field()
  weight: number;
  @Field(() => [SymptomInput], { nullable: true })
  symptoms?: SymptomInput[];
  @Field(() => [Number])
  stoolTypes: number[];
  @Field()
  sleepLenght: number;
  @Field()
  sleepQuality: number;
  @Field()
  mood: number;
  @Field()
  stressLevel: number;
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
export class FormResolver {
  @Mutation(() => Form)
  @UseMiddleware(isAuth)
  async createForm(
    @Arg("input") input: FormInput,
    @Ctx() { req }: Context
  ): Promise<Form> {
    const { symptoms, activities, ...formInput } = input;
    const form = await Form.create({
      ...formInput,
      creatorId: req.session.userId,
    }).save();

    input.activities?.forEach(async (activity) => {
      await Activity.create({
        ...activity,
        formId: form.id,
      }).save();
    });

    input.symptoms?.forEach(async (symptom) => {
      await Symptom.create({
        ...symptom,
        formId: form.id,
      }).save();
    });

    return form;
  }
  @Query(() => Form, { nullable: true })
  @UseMiddleware(isAuth)
  async dayForm(@Arg("date") date: string): Promise<Form | undefined> {
    const form: Form | undefined = await getConnection()
      .getRepository(Form)
      .createQueryBuilder("form")
      .where(`DATE_TRUNC('day', "createdAt") = :date`, {
        date: date,
      })
      .getOne();

    if (form) {
      const activities: Activity[] | undefined = await getConnection()
        .getRepository(Activity)
        .createQueryBuilder()
        .where({ formId: form.id })
        .getMany();

      form.activities = activities;

      const symptoms: Symptom[] | undefined = await getConnection()
        .getRepository(Symptom)
        .createQueryBuilder()
        .where({ formId: form.id })
        .getMany();

      form.symptoms = symptoms;
    }
    return form;
  }

  @Query(() => [Form], { nullable: true })
  @UseMiddleware(isAuth)
  async formsFromTimeRange(
    @Arg("before") before: string,
    @Arg("after") after: string
  ): Promise<Form[] | undefined> {
    const forms: Form[] | undefined = await getConnection()
      .getRepository(Form)
      .createQueryBuilder("form")
      .where(`DATE_TRUNC('day', "createdAt") <= :before`, {
        before: before,
      })
      .andWhere(`DATE_TRUNC('day', "createdAt") >= :after`, {
        after: after,
      })
      .getMany();

    for (const form of forms) {
      const activities: Activity[] | undefined = await getConnection()
        .getRepository(Activity)
        .createQueryBuilder()
        .where({ formId: form.id })
        .getMany();

      form.activities = activities;

      const symptoms: Symptom[] | undefined = await getConnection()
        .getRepository(Symptom)
        .createQueryBuilder()
        .where({ formId: form.id })
        .getMany();

      form.symptoms = symptoms;
    }
    return forms;
  }
}
