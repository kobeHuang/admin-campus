import axios from './axios';


export function axiosLogin({account, password}) {
    return axios({
        method: 'post',
        url: '/api/admin/login',
        params: {
            account, 
            password
        }
    })
}

export function axiosUpload( params ) {
    return axios({
        method: 'post',
        url: '/api/upload',
        params
    })
}

export function axiosBannerPos() {
    return axios({
        url: '/api/admin/bannerPos'
    })
}

export function axiosBanners({
    pos = '',
    keywords = '',
    pageNo = 1,
    pageSize = 10 
}) {
    return axios({
        url: '/api/admin/banner',
        params: {
            pos,
            keywords,
            pageNo,
            pageSize
        }
    })
}

export function axiosBannerSave(params) {
    return axios({
        method: 'post',
        url: '/api/admin/banner/save',
        params
    })
}

export function axiosBannerDel(params) {
    return axios({
        method: 'post',
        url: '/api/admin/banner/del',
        params
    })
}