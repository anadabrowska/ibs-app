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
export class Activity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  formId: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  moodAfter: number;

  @Field()
  @Column({ type: "float" })
  time: number;

  @ManyToOne(() => Form, (form) => form.activities)
  form: Form;
}
