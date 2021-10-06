import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form";

@ObjectType()
@Entity()
export class Symptom {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  intensity: number;

  @Field()
  @Column()
  isDangerous: boolean;

  @ManyToOne(() => Form, (form) => form.symptoms)
  form: Form;
}
