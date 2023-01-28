<template>
    <div>
        <div class="n-layout-page-header">
            <n-card :bordered="false" title="工作台">
                <n-grid cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen">
                    <n-gi>
                        <div class="flex items-center">
                            <div>
                                <n-avatar circle :size="64" :src="avatar" />
                            </div>
                            <div>
                                <p class="px-4 text-xl">早安，{{ username }}！</p>
                                <p class="px-4 text-black-400">{{ nowTime }}</p>
                            </div>
                        </div>
                    </n-gi>
                    <n-gi>
                        <div class="flex justify-end w-full">
                            <div class="flex flex-1 flex-col justify-center text-right">
                                <span class="text-secondary" style="font-size: 10px;">服务器状态</span>
                                <span class="text-2xl">已连接</span>
                            </div>
                        </div>
                    </n-gi>
                </n-grid>
            </n-card>
            <n-card :bordered="false" title="当前用户">
                <text style="font-size: 16px;">用户权限：{{ userRole }}</text>
                <div style="margin:10px 0">
                    <text style="font-size: 16px;">所属区域：{{ userProvince }}，{{ userCity }}</text>
                </div>
                <div style="margin:10px 0">
                    <text style="font-size: 16px;">用户简介：{{ userDescription }}</text>
                </div>
            </n-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import avatar from '@/assets/images/avatar.jpg';
import { useGlobalStore } from '@/store/modules/global';
import { ref, onMounted, onBeforeUnmount } from 'vue'

const username = ref('获取中')
const userRole = ref('获取中')
const userProvince = ref('获取中')
const userCity = ref('获取中')
const userDescription = ref('获取中')
const nowTime = ref('')
const store = useGlobalStore()
let t = setTimeout(time, 1000);
function pad(num: number, cover: number) {
    return String("0".repeat(cover) + num).slice(-cover);
}
function time() {
    clearTimeout(t);
    let dt = new Date();
    let y = dt.getFullYear();
    let mt = dt.getMonth() + 1;
    let day = dt.getDate();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    nowTime.value = y + '年' + mt + '月' + day + '日' + ' - ' + pad(h, 2) + ' : ' + pad(m, 2) + ' : ' + pad(s, 2);
    // document.querySelector("#clock").innerHTML = y + '年' + mt + '月' + day + '日' + ' - ' + h + ' : ' + m + ' : ' + s;
    t = setTimeout(time, 1000);
}
onMounted(async () => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
    }
    const res = await store.mylogin(params)
    username.value = store.username
    userRole.value = store.userRole
    userProvince.value = store.province
    userCity.value = store.city
    userDescription.value = store.description == '' ? '暂无简介' : store.description
})
onBeforeUnmount(() => {
    clearTimeout(t)
})

</script>

<style lang="less" scoped>
.text-2xl {
    font-size: 20px;
}

.project-card {
    margin-right: -6px;

    &-item {
        margin: -1px;
        width: 33.333333%;
    }
}
</style>
