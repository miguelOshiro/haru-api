import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConfirmEmail1747175821112 implements MigrationInterface {
    name = 'CreateConfirmEmail1747175821112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "have_confirm_email" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "have_confirm_email"`);
    }

}
