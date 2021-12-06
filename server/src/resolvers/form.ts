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
  Int,
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

    for (let i = 0; i < (activities?.length || 0); i++) {
      const activity = activities?.at(i);
      await Activity.create({
        ...activity,
        formId: form.id,
      }).save();
    }

    for (let i = 0; i < (symptoms?.length || 0); i++) {
      const symptom = symptoms?.at(i);
      await Symptom.create({
        ...symptom,
        formId: form.id,
      }).save();
    }

    return form;
  }
  @Mutation(() => Form)
  @UseMiddleware(isAuth)
  async updateForm(
    @Arg("input") input: FormInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<Form> {
    const { symptoms, activities, ...formInput } = input;

    const updatedFrom = await getConnection()
      .createQueryBuilder()
      .update(Form)
      .set({ ...formInput })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    const form = updatedFrom.raw[0];

    await Activity.delete({
      formId: form.id,
    });
    await Symptom.delete({
      formId: form.id,
    });

    let newActivities = [];
    for (let i = 0; i < (activities?.length || 0); i++) {
      const activity = activities?.at(i);
      newActivities.push(
        await Activity.create({
          ...activity,
          formId: form.id,
        }).save()
      );
    }

    let newSymptoms = [];
    for (let i = 0; i < (symptoms?.length || 0); i++) {
      const symptom = symptoms?.at(i);
      newSymptoms.push(
        await Symptom.create({
          ...symptom,
          formId: form.id,
        }).save()
      );
    }

    return {
      ...form,
      symptoms: newSymptoms,
      activities: newActivities,
    };
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
