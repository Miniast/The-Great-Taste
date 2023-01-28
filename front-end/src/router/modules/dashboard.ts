import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { SettingOutlined } from '@vicons/antd';
import { HomeOutline, PersonOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routeName = 'dashboard';

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
        path: '/dashboard',
        name: routeName,
        redirect: '/dashboard/workplace',
        component: Layout,
        meta: {
            title: '个人中心',
            icon: renderIcon(HomeOutline),
            permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
            sort: 0,
        },
        children: [
            {
                path: 'workplace',
                name: `${routeName}_workplace`,
                meta: {
                    title: '个人主页',
                    permissions: ['dashboard_workplace'],
                    icon: renderIcon(PersonOutline),
                },
                component: () => import('@/views/dashboard/workplace/workplace.vue'),
            },
            {
                path: 'console',
                name: `${routeName}_console`,
                meta: {
                    title: '个人信息',
                    icon: renderIcon(SettingOutlined),
                    permissions: ['dashboard_console'],
                },
                component: () => import('@/views/dashboard/console/console.vue'),
            },
        ],
    },
];

export default routes;
