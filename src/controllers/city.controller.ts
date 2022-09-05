import {City} from '$models';
import {CityService, GetCityInfoParam} from '$services';
import {service} from '@loopback/core';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';

export class CityController {
  constructor(@service(CityService) private cityService: CityService) {}

  @post('/getCityInfo')
  @response(200, {
    description: '获取city信息',
    content: {
      'application/json': {
        schema: getModelSchemaRef(City, {includeRelations: true}),
      },
    },
  })
  async getCityInfo(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GetCityInfoParam),
        },
      },
      required: true,
    })
    body: GetCityInfoParam,
  ): Promise<City> {
    return this.cityService.getCityInfo(body);
  }
}
