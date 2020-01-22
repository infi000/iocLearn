export interface ISafeRequestParams {
    url?: string;
    arg?: {
        method?: 'post' | 'get',
        params?: Object
    };
    callback?: Function
}
export interface ISafeRequest {
    fetch(params: ISafeRequestParams): Promise<Object>;
}
