import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1707533166210 implements MigrationInterface {
    name = 'InitialMigration1707533166210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "PK_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "clientId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "clientId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "PK_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
