import emitEvent from '$events';
import {CityInfoHasGroup} from '$models';
import {CityRepository} from '$repositories';
import {
  RemoteProvider,
  RemoteServiceProp,
} from '$services/remotes/remote.service';
import {service} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';

@model()
export class GetCityInfoModel {
  @property()
  id: number;
}

export interface CityServiceProp {
  getCityInfo(
    body: GetCityInfoModel,
    headers: {
      type: number;
      language?: string;
    },
    params?: {
      // param: string,
    },
  ): Promise<CityInfoHasGroup>;
}

export class CityService {
  constructor(
    @service(RemoteProvider) protected remoteService: RemoteServiceProp,
    @repository(CityRepository) private cityRepo: CityRepository,
  ) {}

  async getCityInfo(
    body: GetCityInfoModel,
    headers: {
      type: number;
      language?: string;
    },
    params?: {
      // param: string,
    },
  ): Promise<CityInfoHasGroup> {
    const {type, language} = headers;
    console.log('getCityInfo-type', type);
    console.log('getCityInfo-language', language);
    // let dataResult = await this.remoteService.getRemoteData(apiConfig.token, {
    //   type: 1,
    // });
    let dataResult = {
      status: true,
      data: {
        type: 1,
        date: new Date().getTime(),
      },
    };
    let cityInfo = await this.cityRepo.findById(body.id, {
      include: ['groups'],
    });
    emitEvent('notice', JSON.stringify({demo: 1}));
    let result = {
      id: cityInfo.id,
      name: cityInfo.name,
      date: cityInfo.date,
      groups: cityInfo.groups,
      typeData: dataResult.data,
    };
    return result;
  }
}
