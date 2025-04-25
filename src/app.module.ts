import { Module } from '@nestjs/common';
import { FarmersModule } from './farmers/farmers.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FarmsModule } from './farms/farms.module';
import config from './mikro-orm.config';
import { ExistsConstraint } from './validators/existsConstraint.validator';
import { CultivationModule } from './cultivation/cultivation.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    FarmersModule,
    FarmsModule,
    CultivationModule,
    DashboardModule,
  ],
  providers: [
    ExistsConstraint
  ]
})
export class AppModule {}
