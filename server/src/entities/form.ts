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
  udpatedAt: Date;

  @Field()
  @Column()
  generalFeeling: number;

  @Field()
  @Column()
  weight: number;

  @Field(() => [Symptom], { nullable: true })
  @OneToMany(() => Symptom, (symptom) => symptom.form)
  symptoms?: Symptom[];

  @Field()
  @Column()
  stoolType: number;

  @Field()
  @Column()
  sleepLenght: number;

  @Field()
  @Column()
  sleepQuality: number;

  @Field()
  @Column()
  mood: number;

  @Field()
  @Column()
  stress: number;

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
