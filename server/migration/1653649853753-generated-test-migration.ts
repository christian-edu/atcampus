import { MigrationInterface, QueryRunner } from "typeorm";

export class generatedTestMigration1653649853753 implements MigrationInterface {
    name = 'generatedTestMigration1653649853753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_messages\` CHANGE \`timestamp\` \`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_messages\` CHANGE \`timestamp\` \`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
