import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE, provideThrowable } from '../ioc/ioc';
import BaseController from "./BaseController"

@controller('/longan-bi/pf')
@provideThrowable(TYPE.Controller, 'ApiPfController')
export default class ApiPfController extends BaseController {
    private apiPfService;
    constructor(@inject(TAGS.ApiPfService) ApiPfService) {
        super();
        this.apiPfService = ApiPfService
    }

    @httpGet("/avg")
    private async getAvg(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiPfService.getAvg({ ...params })
    }
    @httpGet("/details")
    private async details(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiPfService.getDetails({ ...params })
    }
}
