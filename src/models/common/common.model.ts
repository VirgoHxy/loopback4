import {Entity, model, property} from '@loopback/repository';

@model()
export class Common extends Entity {
  constructor(data?: Partial<Common>) {
    super(data);
  }

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;
}

export interface CommonRelations {
  // describe navigational properties here
}

export type CommonWithRelations = Common & CommonRelations;
