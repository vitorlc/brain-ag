import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmersService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateFarmerDto) {
    const farmer = new Farmer();
    Object.assign(farmer, dto);
    await this.em.persistAndFlush(farmer);
    return farmer;
  }

  async findAll() {
    return await this.em.find(Farmer, {});
  }

  async findOne(id: string) {
    const farmer = await this.em.findOne(Farmer, { id });
    if (!farmer) {
      throw new NotFoundException(`Farmer with id ${id} not found`);
    }
    return farmer;
  }

  async update(id: string, updateFarmerDto: UpdateFarmerDto) {
    const farmer = await this.em.findOne(Farmer, { id });
    if (!farmer) {
      throw new NotFoundException(`Farmer with id ${id} not found`);
    }

    Object.assign(farmer, updateFarmerDto);
    await this.em.persistAndFlush(farmer); 
    return farmer;
  }

  async remove(id: string) {
    const farmer = await this.em.findOne(Farmer, { id });
    if (!farmer) {
      throw new NotFoundException(`Farmer with id ${id} not found`);
    }

    await this.em.removeAndFlush(farmer);
    return { message: `Farmer with id ${id} removed successfully` };
  }
}
