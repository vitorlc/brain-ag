import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/utils/custom-base-entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';

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
}
