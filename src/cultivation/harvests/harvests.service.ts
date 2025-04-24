import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto } from './dto/create-harvest.dto';

@Injectable()
export class HarvestsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateHarvestDto) {
    const harvest = new Harvest(dto.name);
    await this.em.persistAndFlush(harvest);
    return harvest;
  }

  async remove(name: string) {
    const harvest = await this.em.findOne(Harvest, { name });
    if (!harvest) throw new NotFoundException('Harvest not found');
    await this.em.removeAndFlush(harvest);
  }
}
