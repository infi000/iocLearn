import {IIndex} from '../interface/IIndex'
import {Model} from '../models/User'
import { provide, TAGS } from '../ioc/ioc'

@provide(TAGS.IndexService)
export class IndexService implements IIndex {
    private userStorage: Model.User[] = [
        {
            email: "113@ewq.com",
            name: 'zcy'
        }, {
            email: "hahahh@qq.com",
            name: "tqq"
        }
    ];
    public getUser(id: string): Model.User {
        let result: Model.User;
        result = this.userStorage[id];
        return result
    }
}