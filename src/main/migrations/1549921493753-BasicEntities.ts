import {MigrationInterface, QueryRunner} from "typeorm";

export class BasicEntities1549921493753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "product" ("key" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_120ea9ee74ef0e0774629d448e4" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "entitlement" ("identifier" character varying NOT NULL, CONSTRAINT "PK_64fcddde3cc9ad73113a4c9a116" PRIMARY KEY ("identifier"))`);
        await queryRunner.query(`CREATE TABLE "product_entitlements_entitlement" ("productKey" integer NOT NULL, "entitlementIdentifier" character varying NOT NULL, CONSTRAINT "PK_a10c7f50e32e6ca47c5c731e8c0" PRIMARY KEY ("productKey", "entitlementIdentifier"))`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" ADD CONSTRAINT "FK_550df77c3fc081f3c0911b0d5a4" FOREIGN KEY ("productKey") REFERENCES "product"("key") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" ADD CONSTRAINT "FK_863bdbd12bb8e7d07941fd1dfe0" FOREIGN KEY ("entitlementIdentifier") REFERENCES "entitlement"("identifier") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" DROP CONSTRAINT "FK_863bdbd12bb8e7d07941fd1dfe0"`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" DROP CONSTRAINT "FK_550df77c3fc081f3c0911b0d5a4"`);
        await queryRunner.query(`DROP TABLE "product_entitlements_entitlement"`);
        await queryRunner.query(`DROP TABLE "entitlement"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
