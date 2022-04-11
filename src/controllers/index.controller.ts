import {get, response} from '@loopback/rest';

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor() {}

  @get('/ping')
  @response(200)
  ping(): string {
    return 'ok';
  }
}
