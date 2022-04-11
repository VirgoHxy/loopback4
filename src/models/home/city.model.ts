import {Entity, hasMany, model, property} from '@loopback/repository';
import {Group, GroupInfo, GroupWithRelations} from './group.model';

export interface CityInfo {
  id: number;
  name: string;
  date?: string;
}
export interface CityInfoHasGroup extends CityInfo {
  groups: Array<GroupInfo>;
  typeData: Object;
}

@model()
export class City extends Entity {
  constructor(data?: Partial<City>) {
    super(data);
  }

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
  groups?: GroupWithRelations[];
}

export type CityWithRelations = City & CityRelations;
