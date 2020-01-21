//注入中心 容器
import {Container, inject} from 'inversify';
import { controller, interfaces,httpGet } from 'inversify-koa-utils'
import Router from 'koa-router';
import TAGS from "../constants/tags";
export {
    Container,
    inject,
    controller,
    interfaces,
    httpGet,
    Router,
    TAGS
}