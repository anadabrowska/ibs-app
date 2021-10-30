import { Activity } from "./activity";
import { Symptom } from "./symptom";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Form extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  dayRate: number;

  @Field()
  @Column({ type: "float" })
  weight: number;

  @Field(() => [Symptom], { nullable: true })
  @OneToMany(() => Symptom, (symptom) => symptom.form)
  symptoms?: Symptom[];

  @Field(() => [Number])
  @Column("int", { array: true })
  stoolTypes: number[];

  @Field()
  @Column({ type: "float" })
  sleepLenght: number;

  @Field()
  @Column()
  sleepQuality: number;

  @Field()
  @Column()
  mood: number;

  @Field()
  @Column()
  stressLevel: number;

  @Field(() => [Activity], { nullable: true })
  @OneToMany(() => Activity, (activity) => activity.form)
  activities?: Activity[];

  @Field()
  @Column()
  inTherapy: boolean;

  @Field({ nullable: true })
  @Column()
  menstruation?: boolean;

  @Field()
  @Column()
  migraine: boolean;

  @Field()
  @Column()
  pollakiuria: boolean;

  @Field({ nullable: true })
  @Column()
  notes?: string;

  //meds, more advanced, need to think over

  @ManyToOne(() => User, (user) => user.forms)
  creator: User;
}
