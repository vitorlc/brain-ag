import { Module } from '@nestjs/common';
import { CropsService } from './crops/crops.service';
import { CropsController } from './crops/crops.controller';
import { HarvestsController } from './harvests/harvests.controller';
import { HarvestsService } from './harvests/harvests.service';

@Module({
  controllers: [CropsController, HarvestsController],
  providers: [CropsService, HarvestsService],
})
export class CultivationModule {}
