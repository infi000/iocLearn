import {InversifyKoaServer} from 'inversify-koa-utils';
import * as bodyParser from "koa-bodyparser";
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


const server = new InversifyKoaServer(container);


server.setConfig(app => {
    app.use(bodyParser());
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
    ErrorHandler.error(app, logger)
})


const app = server.build();

app.listen(config.port,()=>{
    console.log("启动成功 ===> http://localhost:" + config.port);
})
