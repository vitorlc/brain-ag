import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Reference } from '@mikro-orm/postgresql';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { Result } from 'src/utils/result';

@Injectable()
export class FarmsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateFarmDto) {
    const { totalArea, agriculturalArea, vegetationArea } = dto;

    if (agriculturalArea + vegetationArea > totalArea) {
      return Result.error(
        'The sum of agriculturalArea and vegetationArea must not exceed totalArea',
        HttpStatus.BAD_REQUEST,
      );
    }

    const farm = new Farm({
      ...dto,
      farmer: this.em.getReference(Farmer, dto.farmerId),
    });
    await this.em.persistAndFlush(farm);
    return Result.success(farm);
  }

  async findAll() {
    const result = await this.em.find(
      Farm,
      {},
      { populate: ['crops', 'crops.harvest'] },
    );
    return Result.success(result);
  }

  async findOne(id: string) {
    const farm = await this.em.findOne(Farm, { id }, { populate: ['crops'] });
    if (!farm) return Result.error('Farm not found', HttpStatus.NOT_FOUND);
    return Result.success(farm);
  }

  async update(id: string, dto: UpdateFarmDto) {
    const farm = await this.em.findOne(Farm, { id });
    if (!farm) return Result.error('Farm not found', HttpStatus.NOT_FOUND);

    if (
      dto.agriculturalArea !== undefined &&
      dto.vegetationArea !== undefined &&
      dto.totalArea !== undefined &&
      dto.agriculturalArea + dto.vegetationArea > dto.totalArea
    ) {
      return Result.error(
        'The sum of agriculturalArea and vegetationArea must not exceed totalArea',
        HttpStatus.BAD_REQUEST,
      );
    }

    farm.update(dto);
    await this.em.flush();
    return Result.success(farm);
  }

  async remove(id: string) {
    const farm = await this.em.findOne(Farm, { id });
    if (!farm) return Result.error('Farm not found', HttpStatus.NOT_FOUND);
    await this.em.removeAndFlush(farm);
    return Result.success({}, 'Farm deleted successfully');
  }
}
