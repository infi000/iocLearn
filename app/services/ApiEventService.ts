import { provide, TAGS, TYPES, inject } from '../ioc/ioc'
import { Event } from '../interface/IApi'
import SafeRequest from "../utils/SafeRequest";

@provide(TAGS.ApiEventService)
export class ApiEventService implements Event.IApi {
    private MyRequest: any;
    constructor() {
        this.MyRequest = new SafeRequest();
    }
    getTop(params: Event.IGetTopParams): Promise<Object> {
        return this.MyRequest.fetch({ url:'/longan-bi/event/top',method:'POST' , params})
    }
    getNum(params: Event.IGetNumParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/event/num', method: 'POST', params })
    }
    getIndexs(params: Event.IGetIndexsParams): Promise<Object>{
        return this.MyRequest.fetch({ url:'/longan-bi/event/indexs', method: 'POST', params});
    }
    getDetails(params: Event.IGetDetailsParams): Promise<Object>{
        return this.MyRequest.fetch({ url:'/longan-bi/event/details', method: 'POST', params});
    }

}
