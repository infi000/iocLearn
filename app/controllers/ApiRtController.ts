import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE, provideThrowable } from '../ioc/ioc';
import BaseController from "./BaseController"

@controller('/longan-bi/rt')
@provideThrowable(TYPE.Controller, 'ApiRtController')
export default class ApiRtController extends BaseController {
    private apiRtService;
    constructor(@inject(TAGS.ApiRtService) ApiRtService) {
        super();
        this.apiRtService = ApiRtService
    }
    @httpGet("/basic")
    private async getBasic(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiRtService.getBasic({ ...params })
    }
    @httpGet("/error")
    private async getError(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiRtService.getError({ ...params })
    }
    @httpGet("/event")
    private async getEvent(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiRtService.getEvent({ ...params })
    }
    @httpGet("/pf")
    private async getPf(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiRtService.getPf({ ...params })
    }
}
