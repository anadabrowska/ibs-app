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
  ObjectType,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Activity } from "../entities/activity";
import { Symptom } from "../entities/symptom";
import { validateForm } from "../utils/formValidation";
import { FieldError } from "./User";
import { ExperimentForm } from "../entities/experimentForm";

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
class ExperimentInput {
  @Field()
  experimentId: number;
  @Field()
  quantity: string;
  @Field()
  generalSensation: number;
}

@InputType()
export class FormInput {
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
  @Field(() => [ExperimentInput], { nullable: true })
  experiments?: ExperimentInput[];
  @Field({ nullable: true })
  notes?: string;
}

@ObjectType()
class FormResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Form, { nullable: true })
  form?: Form;
}

@Resolver()
export class FormResolver {
  @Mutation(() => FormResponse)
  @UseMiddleware(isAuth)
  async createForm(
    @Arg("input") input: FormInput,
    @Ctx() { req }: Context
  ): Promise<FormResponse> {
    const { experiments, symptoms, activities, ...formInput } = input;

    const errors = validateForm(input);
    if (errors) {
      return errors;
    }

    const form = await Form.create({
      ...formInput,
      creatorId: (req.session as any).userId,
    }).save();

    let newActivities: Activity[] = [];
    if (activities) {
      const activityPromises = await activities?.map(async (activity) => {
        newActivities.push(
          await Activity.create({
            ...activity,
            formId: form.id,
          }).save()
        );
      });
      await Promise.all(activityPromises);
    }

    let newSymptoms: Symptom[] = [];
    if (symptoms) {
      const symptomPromises = await symptoms?.map(async (symptom) => {
        newSymptoms.push(
          await Symptom.create({
            ...symptom,
            formId: form.id,
          }).save()
        );
      });
      await Promise.all(symptomPromises);
    }

    let newExperiments: ExperimentForm[] = [];
    if (experiments) {
      const experimentPromises = await experiments?.map(async (experiment) => {
        newExperiments.push(
          await ExperimentForm.create({
            ...experiment,
            formId: form.id,
          }).save()
        );
      });
      await Promise.all(experimentPromises);
    }

    form.activities = newActivities;
    form.symptoms = newSymptoms;
    form.experiments = newExperiments;

    return { form };
  }
  @Mutation(() => FormResponse)
  @UseMiddleware(isAuth)
  async updateForm(
    @Arg("input") input: FormInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<FormResponse> {
    const { experiments, symptoms, activities, ...formInput } = input;

    const errors = validateForm(input);
    if (errors) {
      return errors;
    }

    const updatedFrom = await getConnection()
      .createQueryBuilder()
      .update(Form)
      .set({ ...formInput })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: (req.session as any).userId,
      })
      .returning("*")
      .execute();

    const form: Form = updatedFrom.raw[0];

    await Activity.delete({
      formId: form.id,
    });
    await Symptom.delete({
      formId: form.id,
    });
    await ExperimentForm.delete({
      formId: form.id,
    });

    let newActivities: Activity[] = [];
    if (activities) {
      const activityPromises = await activities?.map(async (activity) => {
        newActivities.push(
          await Activity.create({
            ...activity,
            formId: form.id,
          }).save()
        );
      });
      await Promise.all(activityPromises);
    }

    let newSymptoms: Symptom[] = [];
    if (symptoms) {
      const symptomPromises = await symptoms?.map(async (symptom) => {
        newSymptoms.push(
          await Symptom.create({
            ...symptom,
            formId: form.id,
          }).save()
        );
      });
      await Promise.all(symptomPromises);
    }

    let newExperiments: ExperimentForm[] = [];
    if (experiments) {
      const experimentPromises = await experiments?.map(async (experiment) => {
        newExperiments.push(
          await ExperimentForm.create({
            ...experiment,
            formId: form.id,
          }).save()
        );
      });
      await Promise.all(experimentPromises);
    }

    form.activities = newActivities;
    form.symptoms = newSymptoms;
    form.experiments = newExperiments;

    return { form };
  }
  @Query(() => Form, { nullable: true })
  @UseMiddleware(isAuth)
  async dayForm(
    @Arg("date") date: string,
    @Ctx() { req }: Context
  ): Promise<Form | undefined> {
    const form: Form | undefined = await getConnection()
      .getRepository(Form)
      .createQueryBuilder("form")
      .where(
        `DATE_TRUNC('day', "createdAt") = :date and "creatorId" = :creatorId`,
        {
          date: date,
          creatorId: (req.session as any).userId,
        }
      )
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

      const experiemnts: ExperimentForm[] | undefined = await getConnection()
        .getRepository(ExperimentForm)
        .createQueryBuilder()
        .where({ formId: form.id })
        .getMany();

      form.experiments = experiemnts;
    }
    return form;
  }

  @Query(() => [Form], { nullable: true })
  @UseMiddleware(isAuth)
  async formsFromTimeRange(
    @Arg("before") before: string,
    @Arg("after") after: string,
    @Ctx() { req }: Context
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
      .andWhere('"creatorId" = :creatorId', {
        creatorId: (req.session as any).userId,
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

      const experiemnts: ExperimentForm[] | undefined = await getConnection()
        .getRepository(ExperimentForm)
        .createQueryBuilder()
        .where({ formId: form.id })
        .getMany();

      form.experiments = experiemnts;
    }
    return forms;
  }
}
