// import Mongodb from 'mongodb';
const MongoClient = require('mongodb').MongoClient;
import { TYPES, provideSingleton } from '../ioc/ioc'
import Config from "../config";




@provideSingleton(TYPES.DbRequest)
export default class DbRequest {
    dbClient: any;
    // static instance: any;
    // static getInstance(){
    //     if (!DbRequest.instance){
    //         DbRequest.instance = new DbRequest();
    //     }
    //     return DbRequest.instance
    // }
    constructor() {
        this.dbClient = '';
        //暂时先注释 等需要链接数据库的时候再打开
        // this.connect()
    }
    public async connect() {
        console.log("链接数据库...")
        return new Promise((resolve, reject) => {
            MongoClient.connect(Config.db.url, (err:any, client:any) => {
                if (err) {
                    reject(err)
                } else {
                    console.log("数据库链接成功...")
                    this.dbClient = client.db(Config.db.name);
                    resolve(this.dbClient)
                }
            })
        })

    }
    public async find(name: any, params: any) {
        return new Promise((resolve, reject) => {
            this.dbClient.collection(name).find(params).toArray((err: any, data: unknown) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(data)
                    resolve(data)
                }
            })
        })

    }
}


// var DB = Db.getInstance();

// export default DB;