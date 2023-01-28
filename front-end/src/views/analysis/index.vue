<template>
    <div>
        <n-card :bordered="false" class="proCard">
            <n-data-table :columns="columns" :data="data" :pagination="pagination" class="data-table" />
        </n-card>
        <n-card :bordered="false" class="proCard">
            <div class="mt-4">
                <NRow :gutter="24">
                    <NCol :span="24">
                        <n-card content-style="padding: 0;" :bordered="false">
                            <n-tabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
                                <n-tab-pane name="图示（数据为事先录入）">
                                    <rowchart />
                                </n-tab-pane>
                                <n-tab-pane name="表格">
                                    <chart />
                                </n-tab-pane>
                            </n-tabs>
                        </n-card>
                    </NCol>
                </NRow>
            </div>
        </n-card>
    </div>
</template>
  
<script lang="ts" setup>
import { h, ref, onMounted } from 'vue';
import { useMessage, NButton } from 'naive-ui';
import { useGlobalStore } from '@/store/modules/global';
import rowchart from './rowchart.vue'
import chart from './chart.vue'

const store = useGlobalStore();
const pagination = {
    pageSize: 5
}
const columns = [
    {
        title: "ID",
        key: "user_id",
        width: 200,
    },
    {
        title: "用户名",
        key: "username",
        width: 200,
    },
    {
        title: "省份",
        key: "province",
        width: 200,
    },
    {
        title: "城市",
        key: "city",
        width: 200,
    },
    {
        title: "电话",
        key: "mobile",
        width: 200,
    },
    {
        title: "简介",
        key: "description",
        width: 300,
    }
];
type RowData = {
    user_id: string,
    username: string,
    province: string,
    city: string,
    mobile: string,
    description: string,
}
const data = ref<RowData[]>([])
const reloadTable = async () => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
    }
    const res = await store.getAllUserInfo(params);
    let tempData: RowData[] = [];
    for (let i = 0; i < res.length; i++) {
        tempData.push({
            user_id: res[i].userid,
            username: res[i].username,
            province: res[i].province,
            city: res[i].city,
            mobile: res[i].mobile,
            description: res[i].description,
        })
    }
    data.value = tempData;
}

onMounted(async () => {
    await reloadTable();
})

</script>
  
<style lang="less" scoped>
.proCard {
    max-height: 2000px;
}

.data-table {
    max-height: 1200px;
    width: 100%;
}
</style>
  