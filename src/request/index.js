/*
 * 接口封装
 */
import {API_URL, FILE_UPLOAD_URL} from '../config'
import router from '../router'

export const axios = function(obj, needToken, root) {
    let token = uni.getStorageSync('token')
    if (obj.needLogin && !token) return Promise.reject('取消了当前请求') // 登陆发送否则无操作
    if (needToken && !token) return router.push({ name: 'login', query: {page: getPage()}}) // 登陆发送否则去登陆
    let url = root ? root + obj.url : API_URL + obj.url
    let header = {}
    if (token) header.token = token
    Object.assign(header, obj.header)
    console.log('前端传递数据', url, obj.data)
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            data: obj.data,
            method: obj.method,
            header: header,
            success(res) {
                if (res.statusCode === 200) {
                    if (res.data.message === 'ok') { // 
                        if (res.header.token) {
                            uni.setStorageSync('token', res.header.token)
                        }
                        resolve(res.data)
                    } else if (res.data.message) {
                        responseStatusHandling(res.data.message)
                        reject(res)
                    } else {
                        uni.showToast({ title: '网络出小差', icon: 'none' })
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
export const uploadFile = function(obj, needToken, root) {
    let token = uni.getStorageSync('token')
    if (obj.needLogin && !token) return Promise.reject('取消了当前请求') // 登陆发送否则无操作
    if (needToken && !token) return router.push({ name: 'login', query: {page: getPage()}}) // 登陆发送否则去登陆
    let url = root ? root + obj.url : FILE_UPLOAD_URL + obj.url
    let header = {}
    if (token) header.token = token
    Object.assign(header, obj.header)
    console.log('前端传递数据', url, obj.data)
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url,
            filePath: obj.filePath,
            name: obj.name,
            header,
            formData: obj.data || {},
            success(res) {
                if (res.statusCode === 200) {
                    if (res.data.message === 'ok') {
                        resolve(res.data)
                    } else if (res.data.message) {
                        responseStatusHandling(res.data.message)
                        reject(res)
                    } else {
                        uni.showToast({ title: '网络出小差', icon: 'none' })
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
function responseStatusHandling(status) {
    let userTips = ["商品不存在","文件不符合规范","文件不存在","商品库存不足","没有查询到相关订单",
    '未实名，无法提现',"点赞重复操作",'识别失败，请重新上传', '金额未达到阈值','账户有问题，无法提现，请联系客服']
    let title = status
    if (status === 'token_error') { // token_error token解析错误
        router.push({ name: 'login', query: {page: getPage()}})
        return
    } else if (status === 'token_timeout') { // token失效/静默登陆 
        uni.getUserInfo({
            lang: "zh_CN",
            success(e) {
                uni.login({
                    success(res) {
                        // 请求登陆接口，根聚返回的状态决定是否跳转页面
                        let userInfo = e.userInfo
                        let page = JSON.parse(getPage())
                        let obj = {
                            nickname: userInfo.nickName, //    -- 昵称
                            code: res.code, //      -- code 
                            avatar: userInfo.avatarUrl, //      -- 头像地址
                            gender: userInfo.gender, //      -- 性别
                            language: userInfo.language, //    -- 国家
                            city: userInfo.city, //        -- 城市
                            country: userInfo.country,
                            province: userInfo.province,
                            email: '', //       -- 邮箱
                            address: "" //    -- 详细地址
                        }
                        if (page.shareCode) {
                            obj.shareCode = page.shareCode
                        }
                        login(obj)
                    }
                })
            }
        })
    } else if (userTips.indexOf(status) > -1) {
        uni.showToast({ title, icon: 'none' })
    } else {
        uni.showToast({ title: '网络出小差', icon: 'none' })
    }
}
// 获取页面信息
function getPage() {
    // 获取from路由
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const url = '/' + currentPage.route
    const options = currentPage.options
    return JSON.stringify(Object.assign({ url }, options))
}