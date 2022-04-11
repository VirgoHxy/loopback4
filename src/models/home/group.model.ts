import {belongsTo, Entity, model, property} from '@loopback/repository';
import {City, CityWithRelations} from './city.model';

export interface GroupInfo {
  id: number;
  cityId: number;
  name: string;
  date?: string;
}

@model()
export class Group extends Entity {
  constructor(data?: Partial<Group>) {
    super(data);
  }

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @belongsTo(() => City)
  cityId: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  date?: string;
}

export interface GroupRelations {
  city?: CityWithRelations;
}

export type GroupWithRelations = Group & GroupRelations;
