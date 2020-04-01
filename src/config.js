
let apiUrl, fileUploadUrl, imgUrl
if (process.env.NODE_ENV === 'development') {
    apiUrl = ''
    fileUploadUrl = ''
    imgUrl = ''
} else {
    apiUrl = ''
    fileUploadUrl = ''
    imgUrl = ''
}

export const API_URL = apiUrl
export const FILE_UPLOAD_URL = fileUploadUrl
export const IMG_URL = imgUrl