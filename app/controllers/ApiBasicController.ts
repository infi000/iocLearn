import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE, provideThrowable } from '../ioc/ioc';
import BaseController from "./BaseController"

@controller('/longan-bi/basic')
@provideThrowable(TYPE.Controller, 'ApiBasicController')
export default class ApiBasicController extends BaseController {
    private apiBasicService: any;
    constructor(@inject(TAGS.ApiBasicService) ApiBasicService) {
        super();
        this.apiBasicService = ApiBasicService;
    }
    @httpGet('/index')
    private async getTotalNumber(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        const params = this.baseFilter(ctx);
        const result = await this.apiBasicService.getTotalNumber(params);
        ctx.body = result ;
    }
    @httpGet('/indexs')
    private async getNumber(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        const params = this.baseFilter(ctx);
        const result = await this.apiBasicService.getNumber(params);
        ctx.body = result;
    }
    @httpGet('/http-referer/visit')
    private async getRefererVisit(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        const params = this.baseFilter(ctx);
        const result = await this.apiBasicService.getRefererVisit(params);
        ctx.body = result;
    }
    @httpGet('/http-referer/visit-by-date')
    private async getRefererVisitByDate(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        const params = this.baseFilter(ctx);
        const result = await this.apiBasicService.getRefererVisitByDate(params);
        ctx.body = result;
    }
    
}
