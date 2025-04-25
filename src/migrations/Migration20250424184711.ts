import { Migration } from '@mikro-orm/migrations';

export class Migration20250424184711 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "farm" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "city" varchar(255) not null, "state" varchar(255) not null, "total_area" int not null, "agricultural_area" int not null, "vegetation_area" int not null, "farmer_id" varchar(255) not null, constraint "farm_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "farm" add constraint "farm_farmer_id_foreign" foreign key ("farmer_id") references "farmer" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "farm" cascade;`);
  }
}
