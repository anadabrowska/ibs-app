import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Form } from "./form";

@ObjectType()
@Entity()
export class Symptom extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  formId: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  intensity: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isDangerous?: boolean;

  @ManyToOne(() => Form, (form) => form.symptoms)
  form: Form;
}
