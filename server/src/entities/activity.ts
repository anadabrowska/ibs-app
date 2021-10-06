import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form";

@ObjectType()
@Entity()
export class Activity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  moodAfter: number;

  @Field()
  @Column()
  time: number;

  @ManyToOne(() => Form, (form) => form.activities)
  form: Form;
}
