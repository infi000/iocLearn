import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE, provideThrowable } from '../ioc/ioc';
import BaseController from "./BaseController"

@controller('/longan-bi/event')
@provideThrowable(TYPE.Controller, 'ApiEventController')
export default class ApiEventController extends BaseController {
    private apiEventService: any;
    constructor(@inject(TAGS.ApiEventService) ApiEventService) {
        super();
        this.apiEventService = ApiEventService;
    }
    @httpGet('/top')
    private async getTop(ctx: Router.IRouterContext, next: () => Promise<any>) {
        let params = this.baseFilter(ctx);
        const result = await this.apiEventService.getTop(params);
        ctx.body = result;
    }
    @httpGet('/num')
    private async getNum(ctx: Router.IRouterContext, next: () => Promise<any>) {
        let params = this.baseFilter(ctx);
        const result = await this.apiEventService.getNum(params);
        ctx.body = result;
    }
    @httpGet('/indexs')
    private async getIndexs(ctx: Router.IRouterContext, next: () => Promise<any>) {
        let params = this.baseFilter(ctx);
        const result = await this.apiEventService.getIndexs(params);
        ctx.body = result;
    }
    @httpGet('/details')
    private async getDetails(ctx: Router.IRouterContext, next: () => Promise<any>) {
        let params = this.baseFilter(ctx);
        const result = await this.apiEventService.getDetails(params);
        ctx.body = result;
    }

}
