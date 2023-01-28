import { http } from '@/utils/http/axios';

export function getDroneInfo() {
    return http.request({
        url: 'http://127.0.0.1:5000/drone_info',
        method: 'get',
    });
}
export function getConsoleInfo() {
    return http.request({
        url: '/dashboard/console',
        method: 'get',
    });
}
export function sendMessageServer(params){
    return http.request({
        url: 'http://127.0.0.1:5000/send_message',
        method: 'post',
        params
    }); 
}