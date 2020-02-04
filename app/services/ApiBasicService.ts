import { provide, TAGS, TYPES,inject } from '../ioc/ioc'
import { Basic, IApiBaseParams } from '../interface/IApi'
import SafeRequest from "../utils/SafeRequest";
@provide(TAGS.ApiBasicService)
export class ApiBasicService implements Basic.IApi {

    private safeRequest: SafeRequest;
    constructor() {
        this.safeRequest = new SafeRequest();
    }
    public getTotalNumber(params: IApiBaseParams ): Promise<Object> {
        return this.safeRequest.fetch({ url: "/longan-bi/basic/index", method: "POST",  params})
    }
    public getNumber(params: Basic.IGetNumberParams): Promise<Object> {
        return this.safeRequest.fetch({ url: "/longan-bi/basic/indexs", method: "POST", params })
    }
    public getRefererVisit(params: Basic.iGetRefererVisitParams): Promise<Object> {
        return this.safeRequest.fetch({ url: "/longan-bi/basic/http-referer/visit", method: "POST", params })
    }
    public getRefererVisitByDate(params: Basic.iGetRefererVisitByDateParams): Promise<Object> {
        return this.safeRequest.fetch({ url: "/longan-bi/basic/http-referer/visit-by-date", method: "POST", params })
    }
}