<template>
    <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item>
            <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
                <n-form-item label="新密码" path="password">
                    <n-input placeholder="请输入新密码" v-model:value="formValue.newpassword" />
                </n-form-item>

                <n-form-item label="联系电话" path="mobile">
                    <n-input placeholder="请输入联系电话" v-model:value="formValue.mobile" />
                </n-form-item>

                <n-form-item label="用户简介" path="description">
                    <n-input v-model:value="formValue.description" type="textarea" placeholder="请输入用户简介" />
                </n-form-item>

                <div>
                    <n-space>
                        <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
                    </n-space>
                </div>
            </n-form>
        </n-grid-item>
    </n-grid>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { useGlobalStore } from '@/store/modules/global';

const store = useGlobalStore();
const rules = {
    oldpassword: [
        {
            required: true,
            message: '请输入原密码',
            trigger: 'blur',
        },
    ],
    newpassword: [
        {
            required: true,
            message: '请输入新密码',
            trigger: 'blur',
        },
    ],
    mobile: [
        {
            required: true,
            message: '请输入联系电话',
            trigger: 'input',
        },
    ],
    description: [
        {
            required: true,
            message: '请输入简介',
            trigger: 'blur',
        },
    ]
};
const formRef: any = ref(null);
const message = useMessage();

const formValue = reactive({
    newpassword: '',
    mobile: '',
    description: '',
});

function formSubmit() {
    formRef.value.validate((errors) => {
        if (!errors) {
            if (formValue.newpassword.length < 6) {
                message.error('密码长度不能小于6位');
                return;
            }
            store.password = formValue.newpassword;
            store.mobile = formValue.mobile;
            store.description = formValue.description;
            store.modifyUserInfo(formValue)
            localStorage.setItem('password', formValue.newpassword)
            message.success('更新成功');
        } else {
            message.error('验证失败，请填写完整信息');
        }
    });
}

onMounted(async () => {
    if (store.username == '') {
        const params = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
        const res = await store.mylogin(params);
    }
})
</script>
