import {axios, uploadFile} from './index'

export function pushIdCard(path, data) { return uploadFile({ url: '/user/push_id_card_pic', name: 'id_card', filePath: path, data, }, true) }
export function upIdCardInfo(data) { return axios({ url: '/user/up_id_card_info', method: 'POST', data }, true) } // 上传身份信息