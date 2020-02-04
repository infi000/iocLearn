//注入中心 容器
import {Container, inject, } from 'inversify';
import { controller, interfaces,httpGet,TYPE } from 'inversify-koa-utils'
import Router from 'koa-router';
import TAGS from "../constants/tags";
import TYPES from "../constants/types";

import { provide, buildProviderModule, fluentProvide, } from "inversify-binding-decorators";

// 流式注入，当名字等于xx时可注入
const provideThrowable = (identifier: any,name) => {
    return fluentProvide(identifier)
        .whenTargetNamed(name)
        .done();
};
// 单例
const provideSingleton = function (identifier) {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done();
};

const provideUrl = function (identifier,name) {
    
}
export {
    //inversify
    Container,
    inject,
    //inversify-koa-utils
    controller,
    interfaces,
    httpGet,
    TYPE,
    // koa-router
    Router,
    // inversify-binding-decorators
    provide,
    buildProviderModule,
    // 自定义
    TAGS,
    TYPES,
    provideThrowable,
    provideSingleton
}