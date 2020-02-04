import { provide, TAGS, TYPES, inject } from '../ioc/ioc'
import { Error } from '../interface/IApi'
import SafeRequest from "../utils/SafeRequest";
const sourceMap = require('source-map');

@provide(TAGS.ApiErrorService)
export class ApiErrorService implements Error.IApi {
    private MyRequest: SafeRequest;
    constructor(){
        this.MyRequest = new SafeRequest();
    }
    async parseError(params){
        const { scriptUrl, line, column } = params;
        const request = new SafeRequest("");
        const text = await request.fetchStaticFiles(scriptUrl);
        if(text.status==-1){
            return text
        }
        const data = await sourceMap.SourceMapConsumer.with(text, null, consumer=>{
            return consumer.originalPositionFor({
                line, // 压缩后的行号
                column // 压缩后的列号
            });
        }); 
        return { status: 0, message: 'success', data };
    }
    countByType(params: Error.ICountByTypeParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/error/count-by-type', method: 'POST', params })
    }
    countByDate(params: Error.ICountByDateParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/error/count-by-date', method: 'POST', params })
    }
    details(params: Error.IDetailsParams): Promise<Object> {
        return this.MyRequest.fetch({ url: '/longan-bi/error/details', method: 'POST', params })
    }
}
