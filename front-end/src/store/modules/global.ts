import { defineStore } from 'pinia';
import { mylogin, modifyUserInfo, getRequestsInfo, getMyReqInfo, addRequest, deleteRequest, modifyRequest, getReplyInfo, addReply, deleteReply, checkReply, acceptReply, modifyReply,getAllUserInfo } from '@/api/system/global';

export const useGlobalStore = defineStore({
    id: 'global',
    state: () => ({
        login_state: false,
        userid: '',
        username: '',
        userRole: '',
        password: '',
        province: '',
        city: '',
        email: '',
        mobile: '',
        description: '',
        allUserInfo: [],
        requestsInfo: [],
        myReqInfo: [],
        myReplyInfo: [],
        replyInfo: []
    }),
    getters: {
    },
    actions: {
        async mylogin(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                mylogin(param)
                    .then((res) => {
                        if (res.code == 0) {
                            that.userid = res.userid
                            that.username = res.username
                            that.userRole = res.user_role
                            that.password = res.password
                            that.province = res.province
                            that.city = res.city
                            that.login_state = true
                            localStorage.setItem('username', that.username)
                            localStorage.setItem('password', that.password)
                        }
                        else {
                            that.login_state = false
                        }
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        modifyUserInfo(newInfo) {
            let that = this;
            newInfo.username = that.username
            return new Promise((resolve, reject) => {
                modifyUserInfo(newInfo)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        getRequestsInfo(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                getRequestsInfo(param)
                    .then((res) => {
                        that.requestsInfo = res
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        getMyReqInfo(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                getMyReqInfo(param)
                    .then((res) => {
                        that.myReqInfo = res
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        addRequest(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                addRequest(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        deleteRequest(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                deleteRequest(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        modifyRequest(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                modifyRequest(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        checkReply(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                checkReply(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        acceptReply(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                acceptReply(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        getReplyInfo(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                getReplyInfo(param)
                    .then((res) => {
                        that.myReplyInfo = res
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        addReply(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                addReply(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        deleteReply(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                deleteReply(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },
        modifyReply(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                modifyReply(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        },

        getAllUserInfo(param) {
            let that = this;
            return new Promise((resolve, reject) => {
                getAllUserInfo(param)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error);
                    });
            });
        }
    },
});

// // Need to be used outside the setup
// export function useUserStoreWidthOut() {
//     return useUserStore(store);
// }
