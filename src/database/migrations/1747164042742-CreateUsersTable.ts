import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1747164042742 implements MigrationInterface {
    name = 'CreateUsersTable1747164042742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission_types" ("created_by" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(100), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_969d3e40e718294161b1450b9c3" UNIQUE ("name"), CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("created_by" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(100), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" SERIAL NOT NULL, "value" character varying(200) NOT NULL, "action" character varying(200) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "permission_type_id" integer, CONSTRAINT "UQ_88078c3f9aae6a07085339fc7b7" UNIQUE ("value"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions" ("id" SERIAL NOT NULL, "role_id" uuid NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_298f2c0e2ea45289aa0c4ac8a02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0cd11f0b35c4d348c6ebb9b36b" ON "roles_permissions" ("role_id", "permission_id") `);
        await queryRunner.query(`CREATE TABLE "role" ("created_by" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(100), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_by" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(100), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "phone_number" character varying(20) NOT NULL, "password" character varying(255) NOT NULL, "firstname" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "avatar" character varying(255), "status" character varying NOT NULL DEFAULT 'active', "signin_failed" integer NOT NULL DEFAULT '0', "date_block" TIMESTAMP, "confirm_email" boolean NOT NULL DEFAULT false, "role_id" uuid NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_e09e2e301d772d99d93ce84adbe" FOREIGN KEY ("permission_type_id") REFERENCES "permission_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_e09e2e301d772d99d93ce84adbe"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0cd11f0b35c4d348c6ebb9b36b"`);
        await queryRunner.query(`DROP TABLE "roles_permissions"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "permission_types"`);
    }

}
