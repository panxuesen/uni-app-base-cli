import {request, axios, uploadFile} from './index'
import {PAY_URL} from '@/config'

export function pushIdCard(path, data) { return uploadFile({ url: '/user/push_id_card_pic', name: 'id_card', filePath: path, data}) }