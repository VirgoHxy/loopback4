import emitEvent from '$events';
import {City} from '$models';
import {CityRepository} from '$repositories';
import {RemoteProvider, RemoteServiceProp} from '$services';
import {BindingScope, injectable, service} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';

@model()
export class GetCityInfoParam {
  @property({
    type: 'number',
    required: true,
  })
  id: number;
}

@injectable({scope: BindingScope.TRANSIENT})
export class CityService {
  constructor(
    @service(RemoteProvider) protected remoteService: RemoteServiceProp,
    @repository(CityRepository) public cityRepo: CityRepository,
  ) {}

  async getCityInfo(body: GetCityInfoParam): Promise<City> {
    // let dataResult = await this.remoteService.getRemoteData(apiConfig.token, {
    //   type: 1,
    // });
    // const dataResult = {
    //   status: true,
    //   data: {
    //     type: 1,
    //     date: new Date().getTime(),
    //   },
    // };
    const cityInfo = await this.cityRepo.findById(body.id, {
      include: ['groups'],
    });
    emitEvent('notice', JSON.stringify({demo: 1}));
    return cityInfo;
  }
}
