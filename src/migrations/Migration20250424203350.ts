import { Migration } from '@mikro-orm/migrations';

export class Migration20250424203350 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "harvest" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, constraint "harvest_pkey" primary key ("id"));`);

    this.addSql(`create table "crop" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "farm_id" varchar(255) not null, "harvest_id" varchar(255) not null, constraint "crop_pkey" primary key ("id"));`);

    this.addSql(`alter table "crop" add constraint "crop_farm_id_foreign" foreign key ("farm_id") references "farm" ("id") on update cascade;`);
    this.addSql(`alter table "crop" add constraint "crop_harvest_id_foreign" foreign key ("harvest_id") references "harvest" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "crop" drop constraint "crop_harvest_id_foreign";`);

    this.addSql(`drop table if exists "harvest" cascade;`);

    this.addSql(`drop table if exists "crop" cascade;`);
  }

}
