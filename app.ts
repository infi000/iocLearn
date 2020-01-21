import {InversifyKoaServer} from 'inversify-koa-utils';
import {Container} from './ioc/ioc';

const container = new Container();

container.load();


let server = new InversifyKoaServer(container);


server.setConfig(app => {
    //静态资源
}).setErrorConfig(app=>{
    //容错
})


let app = server.build();

app.listen(4000,()=>{
    console.log("inversify启动成功");
})