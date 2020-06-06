import {API_URL, FILE_UPLOAD_URL} from '@/config'
import {getSringPageIngo} from '@/common'
import router from '@/router'

export const request = function (obj) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: obj.url,
            data: obj.data,
            method: obj.method,
            header: obj.header,
            success(res) {
                resolve(res)
            },
            fail(res) {
                reject(res)
            }
        })
    })
}
/**
 * 接口请求封装
 * @param {Object} obj {url: '接口地址', method: '请求方式', data: '请求参数', header: '请求头', needToken: '是否需要token', needLogin: '是否需要登陆'}
 * @param {string} root 请求跟路径如果不传则默认使用API_URL
 */
export const axios = function(obj, root) {
    let token = uni.getStorageSync('token')
    if (obj.needToken && !token) return Promise.reject('取消了当前请求') // 没有token，取消请求
    if (obj.needLogin && !token) return router.push({ name: 'login', query: {page: getSringPageIngo()}}) // 没有token，跳转登陆页
    let url = root ? root + obj.url : API_URL + obj.url
    let header = {}
    if (token) header.token = token
    Object.assign(header, obj.header)
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            data: obj.data,
            method: obj.method,
            header: header,
            success(res) {
                if (res.statusCode === 200) {
                    if (res.data.code === 200) { // 
                        if (res.header.token) {
                            uni.setStorageSync('token', res.header.token)
                        }
                        resolve(res.data)
                    } else if (res.data.code) {
                        responseStatusHandling(res.data)
                        reject(res)
                    } else {
                        uni.showToast({ title: '服务器接口有误', icon: 'none' })
                        reject(res)
                    }
                } else {
                    uni.showToast({ title: '网络出小差', icon: 'none' })
                    reject(res)
                }
            },
            fail(res) {
                uni.showToast({ title: '网络错误, 请求超时(fail)', icon: 'none' })
                reject(res)
            },
            complete(res) {
                console.log('后端响应数据', url, res)
            }
        })
    })
}

/**
 * 文件上传
 * @param {Object} obj {url: '接口地址', data: '请求参数', filePath: '文件暂存路径', name: '文件的key', header: '请求头', needToken: '是否需要token', needLogin: '是否需要登陆'}
 * @param {string} root 请求跟路径如果不传则默认使用API_URL
 */
export const uploadFile = function(obj, root) {
    let token = uni.getStorageSync('token')
    if (obj.needToken && !token) return Promise.reject('取消了当前请求') // 登陆发送否则无操作
    if (obj.needLogin && !token) return router.push({ name: 'login', query: {page: getSringPageIngo()}}) // 登陆发送否则去登陆
    let url = root ? root + obj.url : FILE_UPLOAD_URL + obj.url
    let header = {}
    if (token) header.token = token
    Object.assign(header, obj.header)
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url,
            filePath: obj.filePath,
            name: obj.name,
            header,
            formData: obj.data || {},
            success(res) {
                if (res.statusCode === 200) {
                    if (res.data.code === 200) {
                        resolve(res.data)
                    } else if (res.data.code) {
                        responseStatusHandling(res.data)
                        reject(res)
                    } else {
                        uni.showToast({ title: '服务器接口有误', icon: 'none' })
                        reject(res)
                    }
                } else {
                    uni.showToast({ title: '网络出小差', icon: 'none' })
                    reject(res)
                }
            },
            fail(res) {
                uni.showToast({ title: '网络错误, 请求超时(fail)', icon: 'none' })
                reject(res)
            },
            complete(res) {
                console.log('后端响应数据', url, res)
            }
        })
    })
}

// 错误的响应状态处理
function responseStatusHandling(data) {
    if (data.code === 401) { // token解析错误
        return router.push({ name: 'login', query: {page: getSringPageIngo()}})
    } else if (data.code === 403) { // token失效/静默登陆 
        uni.getUserInfo({
            lang: "zh_CN",
            success(e) {
                uni.login({
                    success(res) {
                        // 请求登陆接口，根聚返回的状态决定是否跳转页面
                        let userInfo = e.userInfo
                        let obj = {
                            nickname: userInfo.nickName, //    -- 昵称
                            code: res.code, //      -- code 
                            avatar: userInfo.avatarUrl, //      -- 头像地址
                            gender: userInfo.gender, //      -- 性别
                            language: userInfo.language, //    -- 国家
                            city: userInfo.city, //        -- 城市
                            country: userInfo.country,
                            province: userInfo.province
                        }
                        login(obj)
                    }
                })
            }
        })
    } else {
        return uni.showToast({ title: data.message, icon: 'none' })
    }
}
