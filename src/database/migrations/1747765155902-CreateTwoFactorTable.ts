import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTwoFactorTable1747765155902 implements MigrationInterface {
    name = 'CreateTwoFactorTable1747765155902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "have_two_factor" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "two_factor" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "two_factor"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "have_two_factor"`);
    }

}
