import { Module } from '@nestjs/common';
import { FarmersModule } from './farmers/farmers.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FarmsModule } from './farms/farms.module';
import config from './mikro-orm.config';
import { ExistsConstraint } from './validators/existsConstraint.validator';
import { CultivationModule } from './cultivation/cultivation.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    // Infra
    MikroOrmModule.forRoot(config),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
    TerminusModule,
    // Domain
    FarmersModule,
    FarmsModule,
    CultivationModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [ExistsConstraint],
})
export class AppModule {}
