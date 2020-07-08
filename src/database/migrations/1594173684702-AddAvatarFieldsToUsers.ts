import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { query } from "express";

export class AddAvatarFieldsToUsers1594173684702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn(
        {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }

}
