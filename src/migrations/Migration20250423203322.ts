import { Migration } from '@mikro-orm/migrations';

export class Migration20250423203322 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "farmer" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "cpf_cnpj" varchar(255) not null, constraint "farmer_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "farmer" cascade;`);
  }

}
