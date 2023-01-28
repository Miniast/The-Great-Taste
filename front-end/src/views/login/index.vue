<template>
    <div class="view-account">
        <div class="view-account-header"></div>
        <div class="view-account-container">
            <div class="view-account-top">
                <div class="view-account-top-logo">
                    <img src="~@/assets/images/logo.png" alt="" />
                    <p class="view-account-top-logo-desc">好味道原型系统</p>
                </div>
            </div>
            <div class="view-account-form" v-if="isLogin">
                <n-form ref="formRef" label-placement="left" size="large" :model="formInline" :rules="rules">
                    <n-form-item path="username">
                        <n-input v-model:value="formInline.username" placeholder="请输入用户名">
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <PersonOutline />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input v-model:value="formInline.password" type="password" showPasswordOn="click"
                            placeholder="请输入密码">
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <LockClosedOutline />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item class="default-color">
                        <div class="flex justify-between">
                            <div class="flex-initial" style="zoom:0.95; margin-right: 10px;">
                                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
                            </div>
                            <div class="flex-initial order-last">
                                <a href="javascript:" @click="handleForgetPassword">忘记密码</a>
                            </div>
                        </div>
                    </n-form-item>
                    <n-form-item>
                        <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
                            登录
                        </n-button>
                    </n-form-item>
                </n-form>
                <div class="flex-initial" style="margin-left: auto">
                    <text style="margin-right:10px; ">还没有账号?</text>
                    <a href="javascript:" @click="switchToRegister"> 注册账号</a>
                </div>
            </div>
            <div class="view-account-form" v-else>
                <n-form ref="formRef" label-placement="left" size="large" :model="regFormInline" :rules="regRules">
                    <n-form-item path="username">
                        <n-input v-model:value="regFormInline.username" placeholder="请输入用户名">
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <PersonOutline />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input v-model:value="regFormInline.password" type="password" showPasswordOn="click"
                            placeholder="请输入密码">
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <LockClosedOutline />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="province" inline>
                        <n-input v-model:value="regFormInline.province" showPasswordOn="click" placeholder="省份">
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <PlaceOutlined />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="city" inline>
                        <n-input v-model:value="regFormInline.city" showPasswordOn="click" placeholder="城市">
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <LocationCityOutlined />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item>
                        <n-button type="error" @click="handleReturn" size="large" :loading="loading"
                            style="width:47%; margin-right:20px">
                            返回
                        </n-button>
                        <n-button type="info" @click="handleRegister" size="large" :loading="loading"
                            style="width:47%; margin-left:auto">
                            注册
                        </n-button>
                    </n-form-item>
                </n-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { useGlobalStore } from '@/store/modules/global';
import { useMessage } from 'naive-ui';
import { ResultEnum } from '@/enums/httpEnum';
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
import { PlaceOutlined, LocationCityOutlined } from '@vicons/material';
import { PageEnum } from '@/enums/pageEnum';
import axios from 'axios';

interface FormState {
    username: string;
    password: string;
}

const formRef = ref();
const message = useMessage();
const loading = ref(false);
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;
const autoLogin = ref(true);
const isLogin = ref(true);
const formInline = reactive({
    username: 'admin',
    password: 'administrator',
    isCaptcha: true,
});
const regFormInline = reactive({
    username: '',
    password: '',
    province: '',
    city: '',
    isCaptcha: true,
});

const rules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
};
const regRules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: {
        required: true, message: '请输入密码', trigger: 'blur',
        validator(rule, value) {
            if (value.length < 6) {
                return new Error('密码长度不能小于6位');
            } 
            return true;
        },
    },
}

const userStore = useUserStore();
const store = useGlobalStore();
const router = useRouter();
const route = useRoute();

const handleForgetPassword = () => {
    message.info("请联系管理员处理")
}

const switchToRegister = () => {
    isLogin.value = false;
}

const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
        if (!errors) {
            const { username, password } = formInline;
            message.loading('登录中...');
            loading.value = true;

            const params: FormState = {
                username,
                password,
            };

            const res = await store.mylogin(params)
            if (store.login_state == true) {
                try {
                    const { code, message: msg } = await userStore.login(params);
                    message.destroyAll();
                    if (code == ResultEnum.SUCCESS) {
                        const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
                        if (route.name === LOGIN_NAME) {
                            router.replace('/');
                        } else router.replace(toPath);
                        message.success('登录成功，即将进入系统');
                    } else {
                        message.info(msg || '登录失败');
                    }
                } finally {
                    loading.value = false;
                }
            }
            else {
                loading.value = false;
                message.destroyAll();
                message.error('用户名或密码错误，登录失败');
            }

        } else {
            message.error('密码长度应大于等于6位');
        }
    });
};
const handleRegister = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
        if (!errors) {
            const params = {
                username: regFormInline.username,
                password: regFormInline.password,
                province: regFormInline.province,
                city: regFormInline.city,
            }
            const res = await userStore.register(params);
            if (res.result['code'] == 0)
                message.loading('注册成功');
            else
                message.info('用户已存在')
        } else {
            message.error('请填写完整信息并进行校验');
        }
    });
};

const handleReturn = () => {
    isLogin.value = true;
}
</script>

<style lang="less" scoped>
.view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
        flex: 1;
        margin: 100px auto 370px;
        padding: 20px 40px;
        width: 500px;
        border-radius: 5px;
        background-color: rgba(250, 250, 250, 0.9);
    }

    &-top {
        padding: 20px 0;
        text-align: center;

        &-logo {
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            white-space: nowrap;

            img {
                margin: 0 10px;
                width: 60px;
            }

            &-desc {
                margin: 0 10px;
                font-size: 26px;
                font-weight: bold;
                color: #000000;
            }
        }

        &-desc {
            font-size: 14px;
            color: #000000;
        }
    }

    &-other {
        width: 100%;
    }

    .default-color {
        color: #515a6e;

        .ant-checkbox-wrapper {
            color: #515a6e;
        }
    }
}

@media (min-width: 768px) {
    .view-account {
        background-image: url('../../assets/images/login.jpg');
        background-repeat: no-repeat;
        background-position: 100%;
        background-size: 100%;
    }

    .page-account-container {
        padding: 32px 0 24px 0;
    }
}
</style>
