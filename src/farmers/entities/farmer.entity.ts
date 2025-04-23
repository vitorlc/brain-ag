import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/utils/custom-base-entity';

@Entity()
export class Farmer extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  cpfCnpj: string;
}
