import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { Result } from 'src/utils/result';

@Injectable()
export class HarvestsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateHarvestDto) {
    const harvest = new Harvest(dto.name);
    await this.em.persistAndFlush(harvest);
    return Result.success(harvest);
  }

  async remove(name: string) {
    const harvest = await this.em.findOne(Harvest, { name });
    if (!harvest) return Result.error('Harvest not found', HttpStatus.NOT_FOUND);
    await this.em.removeAndFlush(harvest);
    return Result.success({});
  }
}
