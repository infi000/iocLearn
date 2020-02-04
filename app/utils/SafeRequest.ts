import { ISafeRequest, ISafeRequestParams } from "../interface/ISafeRequest";
import * as fetch from "node-fetch";
import _config from '../config'
const { url: dataParkUrl} = _config.dataPark;
export default class SafeRequest implements ISafeRequest {
    // @inject(TYPES.BaseUrl) private baseUrl: string;
    public baseUrl:string ;
    private baseResult = { status: 0, message: 'success', data: {} };
    constructor(baseUrl: string = dataParkUrl) {
       this.baseUrl=baseUrl
    }
    private checkStatus(res: any) {
        if (res.ok) { // res.status >= 200 && res.status < 300
            return res;
        } else {
            throw new Error(res.statusText);
        }
    }
    private errorCallback(error: any) {
        console.log("api接口报错",error)
        return { status: -1, message: '资源请求失败', data: error.message }
    }
    public async fetch(safeRequestParams: ISafeRequestParams) {
        const { url, method = 'POST', params = {}, callback } = safeRequestParams;
        console.log(`收到客户端请求参数:${JSON.stringify(params)}`)

        let result = this.baseResult;
        let config: Object = {
            method,
            // body: params
            body: JSON.stringify(params)
        };
        console.log(`发送请求至${this.baseUrl + url},参数为${JSON.stringify(params)}`)

        if (method.toLocaleUpperCase() == 'GET') {
            config = {}
        }

        result = await fetch(this.baseUrl + url,
             {
            ...config, 
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(this.checkStatus)
            .then(res => res.json())
            // .then(res =>{
            //         console.log(res.json())
            //    return res.json()})
            .catch(this.errorCallback)
        return result;
    }
    public async fetchStaticFiles(url: string) {
        let result = this.baseResult;
        result = await fetch(this.baseUrl + url)
            .then(this.checkStatus)
            .then(res => res.text())
            .catch(this.errorCallback)
        return result;
    }
}