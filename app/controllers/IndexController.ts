import { controller, interfaces, httpGet, Router, inject, TAGS, TYPE ,provideThrowable} from '../ioc/ioc';

@controller('/')
  @provideThrowable(TYPE.Controller,'IndexController')
export default class IndexController implements interfaces.Controller {
  indexService: any;
  constructor(@inject(TAGS.IndexService) indexService) {
    this.indexService = indexService;
  }
  @httpGet('/')
  private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
    const result  =  await this.indexService.getUser(1);
    ctx.body = await result;
  }
}
