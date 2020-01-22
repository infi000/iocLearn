import {InversifyKoaServer} from 'inversify-koa-utils';
import { Container, buildProviderModule} from './ioc/ioc';
import "reflect-metadata";
import { configure, getLogger } from "log4js";
import { join } from "path";
import co from "co";
import * as render from "koa-swig";
import * as serve from "koa-static";
import config from './config'
import "./ioc/loader";
import ErrorHandler from "./utils/ErrorHandler";


configure({
    appenders: { cheese: { type: "file", filename: "./logs/longan.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});
const logger = getLogger("cheese");
const container = new Container();

container.load(buildProviderModule());


let server = new InversifyKoaServer(container);


server.setConfig(app => {

    //静态资源
    app.context.render = co.wrap(render({
        root: join(config.viewDir),
        autoescape:true,
        cache:'memory',
        ext:'html',
        varControls:["[[","]]"],
        writeBody:false
    }))

    app.use(serve(config.staticDir)); // 静态资源文件
}).setErrorConfig(app=>{
    //容错
    // ErrorHandler.error(app, logger)
})


let app = server.build();

app.listen(4000,()=>{
    console.log("inversify启动成功 ===> http://localhost:4000");
})

