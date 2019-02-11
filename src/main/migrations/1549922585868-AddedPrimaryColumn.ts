import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPrimaryColumn1549922585868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" DROP CONSTRAINT "FK_863bdbd12bb8e7d07941fd1dfe0"`);
        await queryRunner.query(`ALTER TABLE "entitlement" ADD "company" character varying NOT NULL DEFAULT 'GOGGLES'`);
        await queryRunner.query(`ALTER TABLE "entitlement" DROP CONSTRAINT "PK_64fcddde3cc9ad73113a4c9a116"`);
        await queryRunner.query(`ALTER TABLE "entitlement" ADD CONSTRAINT "PK_acac283fc0d45cac0496bda9ee0" PRIMARY KEY ("identifier", "company")`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" ADD "entitlementCompany" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" DROP CONSTRAINT "PK_a10c7f50e32e6ca47c5c731e8c0"`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" ADD CONSTRAINT "PK_7b1009996d3547efe147e17b88b" PRIMARY KEY ("productKey", "entitlementIdentifier", "entitlementCompany")`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" ADD CONSTRAINT "FK_be82664afc8527ce5a22d5007d5" FOREIGN KEY ("entitlementIdentifier", "entitlementCompany") REFERENCES "entitlement"("identifier","company") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" DROP CONSTRAINT "FK_be82664afc8527ce5a22d5007d5"`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" DROP CONSTRAINT "PK_7b1009996d3547efe147e17b88b"`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" ADD CONSTRAINT "PK_a10c7f50e32e6ca47c5c731e8c0" PRIMARY KEY ("productKey", "entitlementIdentifier")`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" DROP COLUMN "entitlementCompany"`);
        await queryRunner.query(`ALTER TABLE "entitlement" DROP CONSTRAINT "PK_acac283fc0d45cac0496bda9ee0"`);
        await queryRunner.query(`ALTER TABLE "entitlement" ADD CONSTRAINT "PK_64fcddde3cc9ad73113a4c9a116" PRIMARY KEY ("identifier")`);
        await queryRunner.query(`ALTER TABLE "entitlement" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "product_entitlements_entitlement" ADD CONSTRAINT "FK_863bdbd12bb8e7d07941fd1dfe0" FOREIGN KEY ("entitlementIdentifier") REFERENCES "entitlement"("identifier") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
