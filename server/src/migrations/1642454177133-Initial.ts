import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1642454177133 implements MigrationInterface {
    name = 'Initial1642454177133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "symptom" ("id" SERIAL NOT NULL, "formId" integer NOT NULL, "name" character varying NOT NULL, "intensity" integer NOT NULL, "isDangerous" boolean, CONSTRAINT "PK_e6bf8581852864d312308633007" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "gender" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "productName" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP, "isTolerable" boolean, "notes" character varying, "quantity" character varying, CONSTRAINT "PK_4f6eec215c62eec1e0fde987caf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experiment_form" ("id" SERIAL NOT NULL, "formId" integer NOT NULL, "experimentId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "productName" character varying NOT NULL, "quantity" character varying NOT NULL, "generalSensation" integer NOT NULL, CONSTRAINT "PK_f52d50c10f365a67fc7e96e36db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "dayRate" integer NOT NULL, "weight" double precision NOT NULL, "stoolTypes" integer array NOT NULL, "sleepLenght" double precision NOT NULL, "sleepQuality" integer NOT NULL, "mood" integer NOT NULL, "stressLevel" integer NOT NULL, "inTherapy" boolean NOT NULL, "menstruation" boolean NOT NULL, "migraine" boolean NOT NULL, "pollakiuria" boolean NOT NULL, "notes" character varying NOT NULL, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" SERIAL NOT NULL, "formId" integer NOT NULL, "type" character varying NOT NULL, "moodAfter" integer NOT NULL, "time" double precision NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "symptom" ADD CONSTRAINT "FK_f03b72137688b48b4d8251be7fe" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experiment_form" ADD CONSTRAINT "FK_eb3e8ba6646ac3c3e2661e8a4a7" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experiment_form" ADD CONSTRAINT "FK_d9e41031a896cde17501611e1eb" FOREIGN KEY ("experimentId") REFERENCES "experiment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_41a05727e7e2698f596bbd2602e" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_bc4a9cd02a9cdc682310c4a9fd3" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_bc4a9cd02a9cdc682310c4a9fd3"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_41a05727e7e2698f596bbd2602e"`);
        await queryRunner.query(`ALTER TABLE "experiment_form" DROP CONSTRAINT "FK_d9e41031a896cde17501611e1eb"`);
        await queryRunner.query(`ALTER TABLE "experiment_form" DROP CONSTRAINT "FK_eb3e8ba6646ac3c3e2661e8a4a7"`);
        await queryRunner.query(`ALTER TABLE "symptom" DROP CONSTRAINT "FK_f03b72137688b48b4d8251be7fe"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TABLE "form"`);
        await queryRunner.query(`DROP TABLE "experiment_form"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "symptom"`);
    }

}
