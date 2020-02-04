import { provide, TAGS, TYPES, inject } from '../ioc/ioc'
import { Rt } from '../interface/IApi'
import SafeRequest from "../utils/SafeRequest";

@provide(TAGS.ApiRtService)
export class ApiRtService implements Rt.IApi {
    private MyRequest: any;
    constructor() {
        this.MyRequest = new SafeRequest();
    }
    getBasic(params: Rt.IGetBasicParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/rt/basic', method: 'POST', params });
    }
    getError(params: Rt.IGetErrorParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/rt/error', method: 'POST', params });
    }
    getEvent(params: Rt.IGetEventParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/rt/event', method: 'POST', params });
    }
    getPf(params: Rt.IGetPfParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/rt/pf', method: 'POST', params });
    }
}

