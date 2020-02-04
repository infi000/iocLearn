import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE, provideThrowable } from '../ioc/ioc';
import BaseController from "./BaseController"

@controller('/longan-bi/error')
@provideThrowable(TYPE.Controller, 'ApiErrorController')
export default class ApiErrorController extends BaseController {
    private apiErrorService;
    constructor(@inject(TAGS.ApiErrorService) ApiErrorService){
        super();
        this.apiErrorService = ApiErrorService
    }
    @httpGet("/parseError") 
    private async parseError(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        const { scriptUrl, line, column } = this.filterProjectNameParams(ctx);
        const params ={
            scriptUrl: scriptUrl+'.map',
            line,
            column
        }
        ctx.body = await this.apiErrorService.parseError({ ...params})
    }
    @httpGet("/count-by-type")
    private async countByType(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiErrorService.countByType({ ...params })
    }
    @httpGet("/count-by-date")
    private async countByDate(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiErrorService.countByDate({ ...params })
    }
    @httpGet("/details")
    private async details(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let params = this.baseFilter(ctx);
        ctx.body = await this.apiErrorService.details({ ...params })
    }
}
