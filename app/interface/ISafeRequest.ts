export interface ISafeRequestParams {
    url?: string;
    method?: 'POST' | 'GET';
    params?: Object;
    callback?: Function;
}
export interface ISafeRequest {
    fetch(params: ISafeRequestParams): Promise<Object>;
    fetchStaticFiles(url:string): Promise<Object>;
}
