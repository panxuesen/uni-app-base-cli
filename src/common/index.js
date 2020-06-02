// 通用性业务逻辑-挂载原型

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