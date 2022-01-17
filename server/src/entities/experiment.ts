import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExperimentForm } from "./experimentForm";

@ObjectType()
@Entity()
export class Experiment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  productName: string;

  @Field(() => String)
  @CreateDateColumn()
  startDate: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isTolerable?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  quantity?: string;

  @Field(() => [ExperimentForm], { nullable: true })
  @OneToMany(
    () => ExperimentForm,
    (experimentForm) => experimentForm.experiment
  )
  experimentForms?: ExperimentForm[];
}
