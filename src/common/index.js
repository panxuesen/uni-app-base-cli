// 通用性业务逻辑-挂载原型

/**
 * @param {Vue} 
 */

export function COMMON (Vue) {
    Vue.config.productionTip = false
    Vue.prototype.$getShareInfo = getShareInfo
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