//注入中心 容器
import {Container, inject, } from 'inversify';
import { controller, interfaces,httpGet,TYPE } from 'inversify-koa-utils'
import Router from 'koa-router';
import TAGS from "../constants/tags";
import TYPES, {ISafeRequestParams} from "../constants/types";

import { provide, buildProviderModule, fluentProvide, } from "inversify-binding-decorators";

// 流式注入，当名字等于xx时可注入
const provideThrowable = (identifier: any,name) => {
    return fluentProvide(identifier)
        .whenTargetNamed(name)
        .done();
};
export {
    Container,
    inject,
    controller,
    interfaces,
    httpGet,
    Router,
    TAGS,
    TYPE,
    TYPES,
    provide, buildProviderModule ,
    ISafeRequestParams,
    provideThrowable
}