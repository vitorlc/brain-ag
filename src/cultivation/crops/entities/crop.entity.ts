import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/utils/custom-base-entity';
import { Farm } from 'src/farms/entities/farm.entity';  
import { Harvest } from 'src/cultivation/harvests/entities/harvest.entity';

@Entity()
export class Crop extends CustomBaseEntity {
  @Property()
  name: string;

  @ManyToOne(() => Farm, { nullable: false })
  farm: Farm;

  @ManyToOne(() => Harvest, { nullable: false })
  harvest: Harvest;

  constructor(name: string, farm: Farm, harvest: Harvest) {
    super();
    this.name = name;
    this.farm = farm;
    this.harvest = harvest;
  }
}
