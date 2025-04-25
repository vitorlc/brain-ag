import {
  Entity,
  Property,
  OneToMany,
  Cascade,
  PrimaryKey,
} from '@mikro-orm/core';
import { Crop } from 'src/cultivation/crops/entities/crop.entity';
import { CustomBaseEntity } from 'src/utils/custom-base-entity';

@Entity()
export class Harvest extends CustomBaseEntity {
  @Property()
  @PrimaryKey()
  name: string;

  @OneToMany(() => Crop, (crop) => crop.harvest, { cascade: [Cascade.ALL] })
  crops: Crop[];

  constructor(name: string) {
    super();
    this.name = name;
  }
}
