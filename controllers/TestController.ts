import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE, provideThrowable } from '../ioc/ioc';

@controller('/test')
@provideThrowable(TYPE.Controller, 'TestController')
export default class TestController implements interfaces.Controller {
    indexService: any;
    constructor(@inject(TAGS.IndexService) indexService) {
        this.indexService = indexService;
    }
    @httpGet('/action')
    private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        ctx.body = await ctx.render("index.html");
    }
}


