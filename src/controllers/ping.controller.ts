import {get, param, response} from '@loopback/rest';

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor() {}

  @get('/ping')
  @response(200)
  ping(@param.query.string('param') params: string): string {
    return params || 'ok';
  }
}
