import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659990172226 implements MigrationInterface {
    name = 'default1659990172226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "descript" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "descript"`);
    }

}
