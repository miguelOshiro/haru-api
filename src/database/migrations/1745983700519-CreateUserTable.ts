import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1745983700519 implements MigrationInterface {
    name = 'CreateUserTable1745983700519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "userType" character varying NOT NULL DEFAULT 'standard', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
