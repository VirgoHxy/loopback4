import {Entity, hasMany, model, property} from '@loopback/repository';
import dayjs from 'dayjs';
import {Group} from '../models';

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
    default: new Date(),
  })
  date?: string;

  @hasMany(() => Group)
  groups: Group[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<City>) {
    super(data);
    if (this.date) this.date = dayjs(this.date).format('YYYY-MM-DD');
  }
}

export interface CityRelations {
  groups?: Group[];
}

export type CityWithRelations = City & CityRelations;
