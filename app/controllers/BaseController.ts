import { TYPE, provideThrowable, interfaces, } from '../ioc/ioc';

@provideThrowable(TYPE.Controller, 'BaseController')
export default class BaseController implements interfaces.Controller {
    
    public baseFilter = (ctx) => {
        let res = {};
        res = this.filterProjectNameParams(ctx);
        res = this.filterPageParams(res);
        res = this.filterNoNeedParams(res);
        res = this.filterEmptyParams(res);
        return res
    }
    // public setPlugins = (arr: Array<"filterProjectNameParams" | "filterPageParams" | "filterNoNeedParams">) => {
    //     if(arr && arr.length>0){
    //         this.requestFilter = (ctx,params) => {
    //             arr.forEach(fn => {
    //                 fn(ctx,params)
    //             });
    //         }
    //     }
    // }

    /**
     *获取客户端cookie中projectName的值，添加到params参数中
     *
     * @memberof BaseController
     */
    public filterProjectNameParams = (ctx) => {
        const params = ctx.query;
        const projectName = ctx.cookies.get('projectName');
        return { ...params, projectName }
    }
    /**
     * 整合page翻页相关字段
     *
     * @memberof BaseController
     */
    public filterPageParams = (params) => {
        let res = { ...params };
        if (res.len && res.start) {
            res.page = { len: params.len, start: params.start };
            delete res.len;
            delete res.start;
        }
        return res
    }
    /**
     * 过滤evnType,eventType(待添加)等字段，如果值为0，删除此字段
     *
     * @memberof BaseController
     */
    public filterNoNeedParams = (params) => {
        let res = { ...params };
        console.log("res.envType == 0", res.envType == 0)
        if (res.envType == 0) {
            delete res.envType;
        }
        if (res.eventType == 0) {
            delete res.eventType;
        }
        return res;
    }
    /**
     *过滤空值属性
     *
     * @memberof BaseController
     */
    public filterEmptyParams = (params: any) => {
        let res = { ...params };
        for (let key in res) {
            if(res.hasOwnProperty(key) && (res[key] == null || res[key] == undefined || res[key] === ""))
            {
                delete res[key];      //删除没有的属性和空的
            }
        }
        return res;
    }

}


