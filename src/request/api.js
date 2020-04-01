import {axios, uploadFile} from './index'

export function pushIdCard(path, data) { return uploadFile({ url: '/user/push_id_card_pic', name: 'id_card', filePath: path, data}) }