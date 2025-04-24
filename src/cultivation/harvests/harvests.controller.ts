import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { HarvestsService } from './harvests.service';

@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestService: HarvestsService) {}

  @Post()
  create(@Body() createCropDto: CreateHarvestDto) {
    return this.harvestService.create(createCropDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.harvestService.remove(name);
  }
}
