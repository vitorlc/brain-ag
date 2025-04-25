import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Crop } from './entities/crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { Harvest } from '../harvests/entities/harvest.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Result } from 'src/utils/result';

@Injectable()
export class CropsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateCropDto) {
    const farm = await this.em.findOne(Farm, { id: dto.farmId });
    if (!farm) return Result.error('Farm not found', HttpStatus.NOT_FOUND);

    const harvestEntity = await this.em.findOne(Harvest, { name: dto.harvest });
    if (!harvestEntity)
      return Result.error('Harvest not found', HttpStatus.NOT_FOUND);

    const crop = farm.addCrop(dto, harvestEntity);
    await this.em.persistAndFlush(crop);
    return Result.success(crop);
  }

  async remove(id: string) {
    const crop = await this.em.findOne(Crop, { id });

    if (!crop) return Result.error('Crop not found', HttpStatus.NOT_FOUND);

    await this.em.removeAndFlush(crop);
    return Result.success({}, 'Crop deleted successfully');
  }
}
