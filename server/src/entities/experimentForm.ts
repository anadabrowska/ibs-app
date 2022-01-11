import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Experiment } from "./experiment";
import { Form } from "./form";

@ObjectType()
@Entity()
export class ExperimentForm extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  formId: number;

  @Field()
  @Column()
  experimentId: number;

  @Field()
  @Column()
  quantity: string;

  @Field()
  @Column()
  generalSensation: number;

  @ManyToOne(() => Form, (form) => form.experiments)
  form: Form;

  @ManyToOne(() => Experiment, (experiment) => experiment.experimentForms)
  experiment: Experiment;
}
