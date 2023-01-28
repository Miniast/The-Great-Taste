import { http } from '@/utils/http/axios';
import exp from 'constants';

/**
 * @description: 根据用户id获取用户菜单
 */
export function mylogin(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/login',
        method: 'POST',
        params: param,
    });
}

export function modifyUserInfo(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/modifyUserInfo',
        method: 'POST',
        params: param,
    });
}

export function getRequestsInfo(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/getRequestsInfo',
        method: 'POST',
        params: param
    });
}

export function getMyReqInfo(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/getMyReqInfo',
        method: 'POST',
        params: param
    });
}

export function getReplyInfo(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/getReplyInfo',
        method: 'POST',
        params: param
    });
}


export function getAllUserInfo() {
    return http.request({
        url: 'http://127.0.0.1:5000/getAllUserInfo',
        method: 'POST',
    });
}

export function addRequest(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/addRequest',
        method: 'POST',
        params: param,
    });
}

export function deleteRequest(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/deleteRequest',
        method: 'POST',
        params: param,
    });
}

export function modifyRequest(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/modifyRequest',
        method: 'POST',
        params: param,
    });
}

export function checkReply(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/checkReply',
        method: 'POST',
        params: param,
    });
}

export function acceptReply(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/acceptReply',
        method: 'POST',
        params: param,
    });
}

export function addReply(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/addReply',
        method: 'POST',
        params: param,
    });
}

export function deleteReply(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/deleteReply',
        method: 'POST',
        params: param,
    });
}
export function modifyReply(param) {
    return http.request({
        url: 'http://127.0.0.1:5000/modifyReply',
        method: 'POST',
        params: param,
    });
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
    return http.request({
        url: '/menu/list',
        method: 'GET',
        params,
    });
}
