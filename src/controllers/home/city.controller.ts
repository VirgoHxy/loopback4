import {custom} from '$config/loopbackConifg.json';
import {CityInfoHasGroup} from '$models';
import {CityService, CityServiceProp, GetCityInfoModel} from '$services';
import {service} from '@loopback/core';
import {model} from '@loopback/repository';
import {api, param, post, requestBody, response} from '@loopback/rest';

@model()
@api({basePath: custom.apiBasePath})
export class CityController {
  constructor(@service(CityService) protected cityService: CityServiceProp) {}

  @post('/getCityInfo')
  @response(200, {
    description: '获取city信息',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'CityInfoResponse',
          properties: {
            id: {type: 'number'},
            name: {type: 'string'},
            date: {type: 'string'},
            groups: {type: 'array', items: {type: 'object'}},
            typeData: {type: 'object'},
          },
        },
      },
    },
  })
  async getCityInfo(
    @requestBody({
      content: {
        'application/json': {
          schema: {'x-ts-type': GetCityInfoModel, required: ['id']},
        },
      },
      required: true,
    })
    body: GetCityInfoModel,
    @param({
      name: 'type',
      in: 'header',
      required: true,
      schema: {type: 'number'},
    })
    type: number,
    @param({
      name: 'language',
      in: 'header',
      required: false,
      schema: {type: 'string'},
    })
    language?: string,
    // @param({
    //   name: 'param',
    //   in: 'query',
    //   schema: {type: 'string'},
    // })
    // param: string,
  ): Promise<CityInfoHasGroup> {
    return await this.cityService.getCityInfo(body, {type, language});
  }
}
