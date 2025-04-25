import {
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/utils/custom-base-entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { Crop } from 'src/cultivation/crops/entities/crop.entity';
import { BadRequestException } from '@nestjs/common';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { Harvest } from 'src/cultivation/harvests/entities/harvest.entity';
import { CreateCropDto } from 'src/cultivation/crops/dto/create-crop.dto';

@Entity()
export class Farm extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  city: string;

  @Property()
  state: string;

  @Property()
  totalArea: number;

  @Property()
  agriculturalArea: number;

  @Property()
  vegetationArea: number;

  @ManyToOne(() => Farmer)
  farmer: Farmer;

  @OneToMany(() => Crop, (crop) => crop.farm)
  crops = new Collection<Crop>(this);

  constructor({
    name,
    city,
    state,
    totalArea,
    agriculturalArea,
    vegetationArea,
    farmer,
  }: {
    name: string;
    city: string;
    state: string;
    totalArea: number;
    agriculturalArea: number;
    vegetationArea: number;
    farmer: Farmer;
  }) {
    super();

    this.name = name;
    this.city = city;
    this.state = state;
    this.totalArea = totalArea;
    this.agriculturalArea = agriculturalArea;
    this.vegetationArea = vegetationArea;
    this.farmer = farmer;
  }

  update(data: UpdateFarmDto) {
    Object.assign(this, data);
  }

  addCrop(data: CreateCropDto, harvest: Harvest) {
    const crop = new Crop(data.name, this, harvest);

    if (!this.crops.contains(crop)) {
      this.crops.add(crop);
      crop.farm = this;
    }
    return crop;
  }
}
