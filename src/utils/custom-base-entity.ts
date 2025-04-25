import { BaseEntity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

export abstract class CustomBaseEntity extends BaseEntity {
  @PrimaryKey()
  id: string = uuid();

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date;
}
