import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Farm } from 'src/farms/entities/farm.entity';
import { CustomBaseEntity } from 'src/utils/custom-base-entity';

@Entity()
export class Farmer extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  cpfCnpj: string;

  @OneToMany(() => Farm, farm => farm.farmer)
  farms = new Collection<Farm>(this);
}
