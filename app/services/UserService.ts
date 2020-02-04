import { provide, TAGS, TYPES, inject } from '../ioc/ioc'
import { IUser } from '../interface/IUser'
import SafeRequest from "../utils/SafeRequest";

@provide(TAGS.UserService)
export class UserService implements IUser {
    private DbRequest:any;
    constructor(@inject(TYPES.DbRequest) DbRequest:any) {
        this.DbRequest = DbRequest;
    }
    //获取数据库信息
    public getSomething(name:String):Promise<Object> {
        return this.DbRequest.find("uploadInfos",{})
    }
}