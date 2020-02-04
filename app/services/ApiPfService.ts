import { provide, TAGS, TYPES, inject } from '../ioc/ioc'
import { Pf } from '../interface/IApi'
import SafeRequest from "../utils/SafeRequest";

@provide(TAGS.ApiPfService)
export class ApiPfService implements Pf.IApi {

    private MyRequest: any;
    constructor() {
        this.MyRequest = new SafeRequest();
    }
    getAvg(params: Pf.IGetAvgParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/pf/avg', method: 'POST', params });
    }
    getDetails(params: Pf.IGetDetailsParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/pf/details', method: 'POST', params });
    }

}
