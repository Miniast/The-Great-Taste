<template>
    <div>
        <n-card :bordered="false" class="proCard">
            <n-data-table :columns="columns" :data="data" />
        </n-card>
        <n-card :bordered="false" class="proCard">
            <n-button type="primary" @click="() => (showModal = true)">
                <template #icon>
                    <n-icon>
                        <PlusOutlined />
                    </n-icon>
                </template>
                新建
            </n-button>
        </n-card>

        <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
            <n-form :model="formParams" ref="formRef" label-placement="left" :label-width="80" class="py-4">
                <n-form-item label="简介">
                    <n-input type="textarea" placeholder="请输入简介信息" v-model:value="formParams.description" />
                </n-form-item>
                <n-form-item label="价格">
                    <n-input type="text" placeholder="请输入价格" v-model:value="formParams.price" />
                </n-form-item>
            </n-form>

            <template #action>
                <n-space>
                    <n-button @click="() => (showModal = false)">取消</n-button>
                    <n-button type="info" :loading="formBtnLoading" @click="addRequest">确定</n-button>
                </n-space>
            </template>
        </n-modal>

        <n-modal v-model:show="showModify" :show-icon="false" preset="dialog" title="修改">
            <n-form :model="formModify" ref="formRef" label-placement="left" :label-width="80" class="py-4">
                <n-form-item label="简介">
                    <n-input type="textarea" placeholder="请输入简介信息" v-model:value="formModify.description" />
                </n-form-item>
                <n-form-item label="价格">
                    <n-input type="text" placeholder="请输入价格" v-model:value="formModify.price" />
                </n-form-item>
            </n-form>

            <template #action>
                <n-space>
                    <n-button @click="() => (showModify = false)">取消</n-button>
                    <n-button type="info" :loading="formBtnLoading" @click="tryModifyRequest">确定</n-button>
                </n-space>
            </template>
        </n-modal>

        <n-modal v-model:show="showReply" :show-icon="false" preset="dialog" title="回复">
            <n-card>
                <div>
                    {{ reply }}
                </div>
            </n-card>

            <template #action>
                <n-space>
                    <n-button @click="() => (showReply = false)">取消</n-button>
                    <n-button type="error" :loading="formBtnLoading" @click="acceptReply">接受</n-button>
                </n-space>
            </template>
        </n-modal>
    </div>
</template>
  
<script lang="ts" setup>
import { h, ref, onMounted } from 'vue';
import { useMessage, NButton } from 'naive-ui';
import { useGlobalStore } from '@/store/modules/global';
import { PlusOutlined } from '@vicons/antd';
type RowData = {
    req_id: string;
    state: number;
    description: string;
    province: string;
    price: number;
    city: string;
}
const data = ref<RowData[]>([])
const store = useGlobalStore();
const formBtnLoading = ref(false);
const showModal = ref(false);
const showModify = ref(false);
const formParams = ref({
    description: '',
    price: ''
})
const formModify = ref({
    description: '',
    price: ''
})
const message = useMessage();
const reloadTable = async () => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
    }
    await store.getMyReqInfo(params)
    let reqData: RowData[] = []
    for (let i = 0; i < store.myReqInfo.length; i++) {
        reqData.push({
            req_id: store.myReqInfo[i].req_id,
            state: store.myReqInfo[i].state,
            description: store.myReqInfo[i].description,
            province: store.myReqInfo[i].province,
            price: store.myReqInfo[i].price,
            city: store.myReqInfo[i].city
        })
    }
    data.value = reqData
}
const addRequest = () => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        description: formParams.value.description,
        price: formParams.value.price
    }
    store.addRequest(params);
    showModal.value = false;
    message.success("添加成功");
    reloadTable();
}
const deleteRequest = async (index) => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        req_id: data.value[index].req_id
    }
    await store.deleteRequest(params);
    message.success("删除成功");
    await reloadTable();
}
const modifyRequest = async (param) => {
    await store.modifyRequest(param);
    message.success("修改成功");
    await reloadTable();
}
const nowindex = ref(0);
const showReply = ref(false);
const tryModifyRequest = async () => {
    showModify.value = false;
    let row = nowindex.value;
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        req_id: data.value[row].req_id,
        description: formModify.value.description,
        price: formModify.value.price
    }
    await modifyRequest(params);
    await reloadTable();
}

const reply = ref('');
const checkReply = async (index) => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        req_id: data.value[index].req_id,
    }
    const res = await store.checkReply(params);
    nowindex.value = index;
    if (res['code'] == 0) {
        message.error("暂无回复");
    }
    else {
        reply.value = res['description'];
    }
    showReply.value = true;
}
const acceptReply = async () => {
    let row = nowindex.value;
    if (data.value[row].state == 2) {
        message.info("回复已被接受");
    }
    else {
        message.info("处理成功");
        const params = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            req_id: data.value[row].req_id,
        }
        await store.acceptReply(params);
    }
    showReply.value = false;
    await reloadTable();
}
const columns = [
    {
        title: "ID",
        key: "req_id",
        width: 150,
    },
    {
        title: "简介",
        key: "description",
        width: 300
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
        title: '修改',
        width: 150,
        key: 'modify',
        render(row, index) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'info',
                    onClick: () => { showModify.value = true; nowindex.value = index; }
                },
                { default: () => '修改请求' }
            )
        }
    },
    {
        title: '删除',
        width: 150,
        key: 'delete',
        render(row, index) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'error',
                    onClick: () => deleteRequest(index)
                },
                { default: () => '删除请求' }
            )
        }
    },
    {
        title: '接受',
        width: 150,
        key: 'delete',
        render(row, index) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'success',
                    onClick: () => checkReply(index)
                },
                { default: () => '查看回复' }
            )
        }
    },
];
onMounted(async () => {
    if (store.myReqInfo.length == 0) {
        const params = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
        await store.getMyReqInfo(params)
    }
    let reqData: RowData[] = []
    for (let i = 0; i < store.myReqInfo.length; i++) {
        reqData.push({
            req_id: store.myReqInfo[i].req_id,
            state: store.myReqInfo[i].state,
            description: store.myReqInfo[i].description,
            province: store.myReqInfo[i].province,
            city: store.myReqInfo[i].city,
            price: store.myReqInfo[i].price,
        })
    }
    data.value = reqData
})

</script>
  
<style lang="less" scoped>
.data-table {
    max-height: 2000px;
    width: 100%;
}
</style>
  