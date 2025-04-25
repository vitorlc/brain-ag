import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Crop } from './entities/crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { Harvest } from '../harvests/entities/harvest.entity';
import { Farm } from 'src/farms/entities/farm.entity';

@Injectable()
export class CropsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateCropDto) {
    const farm = await this.em.findOne(Farm, {id: dto.farmId});
    if (!farm) throw new NotFoundException('Farm not found');
    
    const harvestEntity = await this.em.findOne(Harvest, { name: dto.harvest });
    if (!harvestEntity) throw new NotFoundException('Harvest not found');

    const crop = farm.addCrop(dto, harvestEntity)
    await this.em.persistAndFlush(crop);
    return crop;
  }

  async remove(id: string) {
    const crop = await this.em.findOne(Crop, { id });

    if (!crop) throw new NotFoundException('Crop not found');

    await this.em.removeAndFlush(crop);
    return { message: 'Crop deleted successfully' };
  }
}
