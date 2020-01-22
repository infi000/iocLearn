import { provide, TYPES } from "../ioc/ioc";
import { ISafeRequest } from "../interface/ISafeRequest";
import * as fetch from "node-fetch";

@provide(TYPES.SafeRequest)
export class SafeRequest implements ISafeRequest {
    public async fetch(params: ISafeRequestParams): Promise<Object> {
        const { url, arg, callback } = params;
        let result = { code: "error" };
        let config = {};
        if (arg) {
            config = {
                method: arg.method,
                body: arg.params
            }
        }
        await fetch(url, config)
            .then(res => res.json())
            .then(json => (result = json));
        return result;
    }
}