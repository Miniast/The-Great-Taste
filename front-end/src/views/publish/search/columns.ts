import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
    {
        title: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: '图片',
        key: 'photo',
        width: 400,
        render(row) {
            return h(NAvatar, {
                size: 48,
                src: row.avatar,
            });
        },
    },
    {
        title: '发布者',
        key: 'name',
        width: 100
    },
    // {
    //     title: '头像',
    //     key: 'avatar',
    //     width: 100,
    //     render(row) {
    //         return h(NAvatar, {
    //             size: 48,
    //             src: row.avatar,
    //         });
    //     },
    // },
    {
        title: '省份',
        key: 'province',
        auth: ['basic_list'], // 同时根据权限控制是否显示
        ifShow: (_column) => {
            return true; // 根据业务控制是否显示
        },
        width: 100,
    },
    {
        title: '城市',
        key: 'city',
        width: 100,
    },
];
