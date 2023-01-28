import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import { FastFoodOutline, SearchOutline, DocumentTextOutline } from '@vicons/ionicons5';
import { MessageOutlined } from '@vicons/antd';
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */

const routes: Array<RouteRecordRaw> = [
    {
        path: '/publish',
        name: 'Publish',
        redirect: '/publish/search',
        component: Layout,
        meta: {
            title: '好味道',
            icon: renderIcon(FastFoodOutline),
            sort: 1,
        },
        children: [
            {
                path: 'search',
                name: `publish_search`,
                meta: {
                    title: '查找好味道',
                    icon: renderIcon(SearchOutline),
                    // affix: true,
                    // keepAlive: true,
                },
                component: () => import('@/views/publish/search/search.vue'),
            },
            {
                path: 'seek',
                name: `publish_seek`,
                meta: {
                    title: '我的寻味道',
                    icon: renderIcon(DocumentTextOutline),
                    // affix: true,
                    // keepAlive: true,
                },
                component: () => import('@/views/publish/seek/seek.vue'),
            },
            {
                path: 'reply',
                name: `publish_reply`,
                meta: {
                    title: '我的请品鉴',
                    icon: renderIcon(MessageOutlined),
                    // affix: true,
                    // keepAlive: true,
                },
                component: () => import('@/views/publish/reply/reply.vue'),
            }
        ],
    },
];

export default routes;
