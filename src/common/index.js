// 通用性业务逻辑-挂载原型
import {getPayInfo} from '@/request/common'

/**
 * @param {Vue} 
 */

export function COMMON (Vue) {
    Vue.config.productionTip = false
    Vue.prototype.$getShareInfo = getShareInfo
    getSystemInfo(Vue)
}

/**
 * @description 获取分享信息，用于页面分享
 * @param {Object} 
 * @return {Object}
 */
export function getShareInfo (obj = {}) {
    let shareObj = {
        title: '邀好友得积分',
        path: `/pages/index/index`
    }
    return Object.assign(shareObj, obj)
}

export function getSystemInfo (Vue) {
    let systemInfo = uni.getSystemInfoSync()
    let menuInfo = uni.getMenuButtonBoundingClientRect()
    // 获取手机型号
    if (systemInfo.model.search('iPhone X') != -1 && Vue) {
        Vue.prototype.isIPhoneX = true
    }
    // 获取导航栏宽高 自定义导航栏使用  系统字体大小 systemInfo.fontSizeSetting
    let statusBar = systemInfo.statusBarHeight
    let barHeight = menuInfo.height + (menuInfo.top - statusBar) * 2 + statusBar
    let barInfo = {
        barHeight: barHeight,
        titleHeight: menuInfo.height,
        titleTop: menuInfo.top
    }
    Vue.prototype.$barInfo = barInfo
    return systemInfo
}

// 获取当前页面信息
export function getPageInfo() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const url = '/' + currentPage.route
    const options = currentPage.options
    return Object.assign({ url }, options)
}

/**
 * 获取序列化的页面信息，包含页面路径和参数
 */
export function getSringPageIngo() {
    return JSON.stringify(getPageInfo())
}

// 银联分账支付逻辑
export function payment(tokenId) {
    return new Promise((resolve, reject) => {
        uni.login({
            success (res) {
                console.log('wxcode', res)
                getPayInfo({code: res.code, tokenId}).then(res => {
                    console.log("获取openid,支付要素", res);
                    if (res.data.return_code == '0000') {
                        let payInfo = res.data.miniPayRequest
                        uni.requestPayment({
                            timeStamp: payInfo.timeStamp,
                            nonceStr: payInfo.nonceStr,
                            package: payInfo.package,
                            signType: payInfo.signType,
                            paySign: payInfo.paySign,
                            success (res) {
                                console.log('支付成功', res)
                                resolve(res)
                            },
                            fail (res) {
                                console.log('取消支付', res)
                            //   reject(res)
                            }
                        })
                    } else {
                        console.log('支付失败', res)
                        reject(res)
                    }
                })
            }
        })
    })
}