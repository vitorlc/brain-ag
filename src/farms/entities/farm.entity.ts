import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/utils/custom-base-entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { Crop } from 'src/cultivation/crops/entities/crop.entity';

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

  @OneToMany(() => Crop, crop => crop.farm)
  crops = new Collection<Crop>(this);
}
