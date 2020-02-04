import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE, provideThrowable } from '../ioc/ioc';

@controller('/test')
@provideThrowable(TYPE.Controller, 'TestController')
export default class TestController implements interfaces.Controller {
    indexService: any;
    userService: any;
    constructor(@inject(TAGS.IndexService) indexService, @inject(TAGS.UserService) userService) {
        this.indexService = indexService;
        this.userService = userService;
    }
    @httpGet('/action')
    private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        ctx.body = await ctx.render("index.html");
    }
    @httpGet('/longan')
    private async longan(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        ctx.body = await this.userService.getSomething();
    }
}


