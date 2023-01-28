<template>
    <div>
        <n-card :bordered="false" class="proCard">
            <n-data-table :columns="columns" :data="data" :pagination="pagination" class="data-table" />
        </n-card>

        <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建请品鉴">
            <n-form :model="formParams" ref="formRef" label-placement="left" :label-width="80" class="py-4">
                <n-form-item label="回复">
                    <n-input type="textarea" placeholder="请输入回复信息" v-model:value="formParams.description" />
                </n-form-item>
            </n-form>

            <template #action>
                <n-space>
                    <n-button @click="() => (showModal = false)">取消</n-button>
                    <n-button type="info" @click="addReply">确定</n-button>
                </n-space>
            </template>
        </n-modal>
    </div>
</template>
  
<script lang="ts" setup>
import { h, ref, onMounted } from 'vue';
import { useMessage, NButton } from 'naive-ui';
import { useGlobalStore } from '@/store/modules/global';
const pagination = {
    pageSize: 5
}
const showModal = ref(false);
const formParams = ref({
    description: ''
})
const message = useMessage();

const reloadTable = async () => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
    }
    await store.getRequestsInfo(params)
    let reqData: RowData[] = []
    for (let i = 0; i < store.requestsInfo.length; i++) {
        reqData.push({
            req_id: store.requestsInfo[i].req_id,
            description: store.requestsInfo[i].description == '' ? '默认简介' : store.requestsInfo[i].description,
            province: store.requestsInfo[i].province,
            price: store.requestsInfo[i].price,
            city: store.requestsInfo[i].city,
        })
    }
    data.value = reqData
}
const now_id = ref('')
const addReply = async (req_id) => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        req_id: now_id.value,
        description: formParams.value.description,
    }
    await store.addReply(params)
    message.success('添加成功，可在我的请品鉴中查看')
    showModal.value = false
    reloadTable()
}
const recvRequest = (index) => {
    console.log(data.value)
    showModal.value = true
    now_id.value = data.value[index].req_id
}
const store = useGlobalStore();
const columns = [
    {
        title: "ID",
        key: "req_id",
        width: 150,
    },
    {
        title: "简介",
        key: "description",
        width: 300,
    },
    {
        title: "省份",
        key: "province",
        width: 150,
    },
    {
        title: "城市",
        key: "city",
        width: 150,
    },
    {
        title: "价格",
        key: "price",
        width: 150,
    },
    {
        title: '操作',
        width: 200,
        key: 'actions',
        render(row, index) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'info',
                    onClick: () => recvRequest(index)
                },
                { default: () => '回复' }
            )
        }
    }
];
type RowData = {
    req_id: string,
    description: string,
    province: string,
    city: string,
    price: string,
}
const data = ref<RowData[]>([])
onMounted(async () => {
    if (store.requestsInfo.length === 0) {
        const params = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
        await store.getRequestsInfo(params)
    }
    let reqData: RowData[] = []
    for (let i = 0; i < store.requestsInfo.length; i++) {
        reqData.push({
            req_id: store.requestsInfo[i].req_id,
            description: store.requestsInfo[i].description == '' ? '默认简介' : store.requestsInfo[i].description,
            province: store.requestsInfo[i].province,
            price: store.requestsInfo[i].price,
            city: store.requestsInfo[i].city,
        })
    }
    data.value = reqData
})

</script>
  
<style lang="less" scoped>
.proCard {
    max-height: 2000px;
    color:rgba(226,226,226,0.5)
}

.data-table {
    max-height: 2000px;
    width: 100%;
}
</style>
  