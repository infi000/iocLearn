// export type EVENT_TYPE: IEventType = { 1: '点击', 2: '自定义' }
// export type ERROR_TYPE: IErrorType = { 1: '语法错误', 2: '引用错误', 3: '范围错误', 4: '类型错误', 5: 'URL错误' }
// export type ENV_TYPE: IEnvType = { 1: 'online', 2: 'uat' }
// export type DEVICE_TYPE: IDeviceTYPE = { 1: 'mobile', 2: 'desktop' }

enum EventType { CLICK = "1" , SELF_DEFINE = "2"}
enum ErrorType { SyntaxError = 1, ReferenceError,RangeError,TypeError,URLError}


export interface IApiBaseParams {
    startDate: string;// 起始日期	
    endDate: string;// 结束日期
    envType?: string;// 线上环境
    projectName: string;// 项目名称
}
export interface IApiRtBaseParams {
    startTime: string;// 起始日期	 20191223 00:00:01
    endTime: string;// 结束日期
    envType?: string;// 线上环境
    projectName: string;// 项目名称
}

export interface IPageParams {
    start: Number; //当前页开始Index
    len: Number; //当前页数据量	
}

export namespace Basic{
    export interface IGetNumberParams extends IApiBaseParams {
        type: string; //1:pv, 2:uv, 3:ip,4:event, 5:error	
    }
    export interface iGetRefererVisitParams extends IApiBaseParams {
        httpReferer?:string;
        page:IPageParams
    }
    export interface iGetRefererVisitByDateParams extends IApiBaseParams {
        httpReferer?:string;
        page:IPageParams
    }

    export interface IApi {
        /**
         *各项数据统计总数
         *
         * @param {IApiBaseParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getTotalNumber(params: IApiBaseParams): Promise<Object>;
        /**
         *各项数据每天收集数量
         *
         * @param {IGetNumberParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getNumber(params: IGetNumberParams): Promise<Object>;
        /**
         *时间段内，页面访问量的排行，按照pv降序排列
         *
         * @param {iGetRefererVisitParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getRefererVisit(params: iGetRefererVisitParams): Promise<Object>;
        /**
         *某条路由pv, uv, ip每天访问量
         *
         * @param {iGetRefererVisitByDateParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getRefererVisitByDate(params: iGetRefererVisitByDateParams): Promise<Object>;

    }
}

export namespace Error{
    export interface IParseErrorParams {
        scriptUrl:String,
        line:Number,
        column:Number
    }
    export interface ICountByTypeParams extends IApiBaseParams{
        errorType?: ErrorType // 错误类型

    }
    export interface ICountByDateParams extends IApiBaseParams{
        errorType?: ErrorType // 错误类型
    }
    export interface IDetailsParams extends IApiBaseParams{
        errorType?: ErrorType // 错误类型
        httpReferer?:String
        loginUser?:String
        page: IPageParams // 页数
    }
    export interface IApi{
        /**
         * 分析错误 返回原始代码
         *
         * @param {IParseErrorParams} params
         * @returns {*}
         * @memberof IApi
         */
        parseError(params: IParseErrorParams): any;
        /**
         *时间段内，各个错误触发次数列表
         *
         * @param {ICountByTypeParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        countByType(params: ICountByTypeParams) : Promise<Object>;
        /**
         *各个错误类型每天触发次数
         *
         * @param {ICountByDateParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        countByDate(params: ICountByDateParams) : Promise<Object>;
        /**
         ：时间段内，各个错误错误详细列表，返回数据按时间降序排列
         *
         * @param {IDetailsParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        details(params: IDetailsParams) : Promise<Object>;
    }
}


export namespace Event {

    export interface IGetTopParams extends IApiBaseParams {
        eventType?: EventType // 事件类型
    }
    export interface IGetNumParams extends IApiBaseParams {
        eventType?: EventType // 事件类型
        eventName?: String // 事件名称
    }
    export interface IGetIndexsParams extends IApiBaseParams {
        eventType?: EventType // 事件类型
        eventName?: String // 事件名称
        httpReferer?:String // 路由
        loginUser? :String // 用户id
        page: IPageParams // 页数
    }
    export interface IGetDetailsParams extends IApiBaseParams {
        eventType?: EventType // 事件类型
        eventName?: String // 事件名称
        httpReferer?: String // 路由
        loginUser?: String // 用户id
        page: IPageParams // 页数
    }
    export interface IApi {
        /**
         *时间段内各个埋点数量触发次数
         *
         * @param {IGetTopParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getTop(params: IGetTopParams): Promise<Object>;
        /**
         *时间段内各个埋点每天触发次数列表
         *
         * @param {IGetNumParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getNum(params: IGetNumParams): Promise<Object>;
        /**
         *时间段内，各个埋点触发次数，uv次数的统计列表，返回数据按触发次数降序排列
         *
         * @param {IGetIndexsParams} params
         * @returns {Promes<Object>}
         * @memberof IApi
         */
        getIndexs(params: IGetIndexsParams): Promise<Object>;
        /**
         *描述：时间段内，埋点每一次触发的详细信息列表，时间降序
         *
         * @param {IGetDetailsParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getDetails(params:IGetDetailsParams): Promise<Object>;
    }

}

export namespace Pf {

    export interface IGetAvgParams extends IApiRtBaseParams {
        page: IPageParams // 页数
    }

    export interface IGetDetailsParams extends IApiRtBaseParams {
        page: IPageParams // 页数
        httpReferer?:string
    }

    export interface IApi {
        /**
         *时间段内，关键性能指标每天平均值
         *
         * @param {IGetAvgParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getAvg(params: IGetAvgParams): Promise<Object>;
        /**
         *时间段内，各项性能指标详细信息列表，按时间降序
         *
         * @param {IGetDetailsParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getDetails(params: IGetDetailsParams): Promise<Object>;

    }
}

export namespace Rt {

    export interface IGetBasicParams extends IApiBaseParams {
        httpReferer?:string
        loginUser?:string
        page: IPageParams // 页数
    }
    export interface IGetErrorParams extends IApiBaseParams {
        httpReferer?:string
        loginUser?:string
        errorType?:ErrorType
        page: IPageParams // 页数
    }
    export interface IGetEventParams extends IApiBaseParams {
        httpReferer?:string
        loginUser?:string
        eventName?:string
        page: IPageParams // 页数
    }
    export interface IGetPfParams extends IApiBaseParams {
        httpReferer?:string
        loginUser?:string
        page: IPageParams // 页数
    }
    export interface IApi {
        /**
         *条件搜索日志详细信息，时间降序
         *
         * @param {IGetBasicParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getBasic(params: IGetBasicParams): Promise<Object>;
        /**
         *Error日志查询展示列表
         *
         * @param {IGetErrorParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getError(params: IGetErrorParams): Promise<Object>;
        /**
         *Event日志查询展示列表
         *
         * @param {IGetEventParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getEvent(params: IGetEventParams): Promise<Object>;
        /**
         *Pf日志查询展示列表
         *
         * @param {IGetPfParams} params
         * @returns {Promise<Object>}
         * @memberof IApi
         */
        getPf(params: IGetPfParams): Promise<Object>;

    }
}