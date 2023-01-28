<template>
    <div>
        <n-card :bordered="false" class="proCard">
            <n-data-table :columns="columns" :data="data" />
        </n-card>

        <n-modal v-model:show="showModify" :show-icon="false" preset="dialog" title="修改">
            <n-form :model="formModify" ref="formRef" label-placement="left" :label-width="80" class="py-4">
                <n-form-item label="回复">
                    <n-input type="textarea" placeholder="请输入回复" v-model:value="formModify.description" />
                </n-form-item>
            </n-form>

            <template #action>
                <n-space>
                    <n-button @click="() => (showModify = false)">取消</n-button>
                    <n-button type="info" :loading="formBtnLoading" @click="modifyReply">确定</n-button>
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

const store = useGlobalStore();
const message = useMessage();
const formBtnLoading = ref(false);
type RowData = {
    rep_id: string;
    req_id: string;
    description: string;
}
const data = ref<RowData[]>([]);
const nowindex = ref(0);
const showModify = ref(false);
const formModify = ref({
    description: '',
})
const reloadTable = async () => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
    }
    await store.getReplyInfo(params)
    let reqData: RowData[] = []
    for (let i = 0; i < store.myReplyInfo.length; i++) {
        reqData.push({
            req_id: store.myReplyInfo[i].req_id,
            rep_id: store.myReplyInfo[i].rep_id,
            description: store.myReplyInfo[i].description,
        })
    }
    data.value = reqData
}

const deleteReply = async (row: RowData) => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        rep_id: row.rep_id,
    }
    await store.deleteReply(params)
    message.success('删除成功')
    reloadTable()
}

const modifyReply = async () => {
    const params = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        rep_id: data.value[nowindex.value].rep_id,
        description: formModify.value.description
    }
    await store.modifyReply(params)
    message.success('修改成功')
    reloadTable()
    showModify.value = false
}

const columns = [
    {
        title: "ID",
        key: "rep_id",
        width: 100,
    },
    {
        title: "对应寻味道ID",
        key: "req_id",
        width: 200,
    },
    {
        title: "回复",
        key: "description",
        width: 400,
    },
    {
        title: '修改',
        width: 200,
        key: 'modify',
        render(row, index) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'info',
                    onClick: () => { showModify.value = true; nowindex.value = index; }
                },
                { default: () => '修改回复' }
            )
        }
    },
    {
        title: '删除',
        width: 200,
        key: 'delete',
        render(row) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'error',
                    onClick: () => deleteReply(row)
                },
                { default: () => '删除回复' }
            )
        }
    }
];
onMounted(async () => {
    if (store.myReplyInfo.length == 0) {
        const params = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
        await store.getReplyInfo(params)
    }
    let reqData: RowData[] = []
    for (let i = 0; i < store.myReplyInfo.length; i++) {
        reqData.push({
            req_id: store.myReplyInfo[i].req_id,
            rep_id: store.myReplyInfo[i].rep_id,
            description: store.myReplyInfo[i].description,
        })
    }
    data.value = reqData
})

</script>
  
<style lang="less" scoped>

</style>
  