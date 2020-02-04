import { ISafeRequest, ISafeRequestParams } from "../interface/ISafeRequest";
import * as fetch from "node-fetch";
import { provide, TYPES} from '../ioc/ioc'



@provide(TYPES.MyRequest)
export default class MyRequest implements ISafeRequest {
    // @inject(TYPES.BaseUrl) private baseUrl: string;
    baseUrl: any;
    private baseResult = { status: 0, message: 'success', data: {} };
    constructor(baseUrl?: string) {
    // constructor() {
        this.baseUrl = "baseUrl";
    }
    private checkStatus(res: any) {
        if (res.ok) { // res.status >= 200 && res.status < 300
            return res;
        } else {
            throw new Error(res.statusText);
        }
    }
    private errorCallback(error: any) {
        return { status: -1, message: '资源请求失败', data: error.message }
    }
    public async fetch(safeRequestParams: ISafeRequestParams) {
        const { url, method = 'POST', params = {}, callback } = safeRequestParams;
        let result = this.baseResult;
        let config: Object = {
            method,
            body: params
        };
        if (method.toLocaleUpperCase() == 'GET') {
            config = {}
        }
        result = await fetch(this.baseUrl + url, config)
            .then(this.checkStatus)
            .then(res => res.json())
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