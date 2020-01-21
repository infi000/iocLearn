import { controller, interfaces, httpGet, Router, inject, TAGS } from '../ioc/ioc';

@controller('/')
export default class IndexController implements interfaces.Controller {
  constructor(@inject(TAGS.IndexService) indexService) {
    this.indexService = indexService;
  }
  @httpGet('/')
  private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
    ctx.body = await ctx.render('index');
  }
}
