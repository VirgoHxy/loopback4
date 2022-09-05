import {Group} from '$models';
import {Entity, hasMany, model, property} from '@loopback/repository';

@model()
export class City extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  date?: string;

  @hasMany(() => Group)
  groups: Group[];
}

export interface CityRelations {
  groups?: Group[];
}

export type CityWithRelations = City & CityRelations;
