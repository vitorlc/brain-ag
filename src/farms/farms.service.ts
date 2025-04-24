import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Reference } from '@mikro-orm/postgresql';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';

@Injectable()
export class FarmsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateFarmDto) {
    const { totalArea, agriculturalArea, vegetationArea } = dto;

    if (agriculturalArea + vegetationArea > totalArea) {
      throw new BadRequestException(
        'The sum of agriculturalArea and vegetationArea must not exceed totalArea',
      );
    }

    const farm = new Farm();
    farm.farmer = this.em.getReference(Farmer, dto.farmerId);
    Object.assign(farm, dto);
    await this.em.persistAndFlush(farm);
    return farm;
  }

  findAll() {
    return this.em.find(Farm, {});
  }

  async findOne(id: string) {
    const farm = await this.em.findOne(Farm, { id });
    if (!farm) throw new NotFoundException('Farm not found');
    return farm;
  }

  async update(id: string, dto: UpdateFarmDto) {
    const farm = await this.em.findOne(Farm, { id });
    if (!farm) throw new NotFoundException('Farm not found');

    if (
      dto.agriculturalArea !== undefined &&
      dto.vegetationArea !== undefined &&
      dto.totalArea !== undefined &&
      dto.agriculturalArea + dto.vegetationArea > dto.totalArea
    ) {
      throw new BadRequestException(
        'The sum of agriculturalArea and vegetationArea must not exceed totalArea',
      );
    }

    Object.assign(farm, dto);
    await this.em.flush();
    return farm;
  }

  async remove(id: string) {
    const farm = await this.em.findOne(Farm, { id });
    if (!farm) throw new NotFoundException('Farm not found');
    await this.em.removeAndFlush(farm);
    return { message: 'Farm deleted successfully' };
  }
}
