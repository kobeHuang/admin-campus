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

export function axiosInfoClassify() {
    return axios({
        url: '/api/admin/infoClassify'
    })
}

export function axiosInfoClassifySave(params) {
    return axios({
        method: 'post',
        url: '/api/admin/infoClassify/save',
        params
    })
}

export function axiosInfoClassifyDel(params) {
    return axios({
        method: 'post',
        url: '/api/admin/infoClassify/del',
        params
    })
}

export function axiosInfos({
    classify = '',
    keywords = '',
    pageNo = 1,
    pageSize = 10 
}) {
    return axios({
        url: '/api/admin/info',
        params: {
            classify,
            keywords,
            pageNo,
            pageSize
        }
    })
}

export function axiosInfoSave(params) {
    return axios({
        method: 'post',
        url: '/api/admin/info/save',
        params
    })
}

export function axiosInfoDel(params) {
    return axios({
        method: 'post',
        url: '/api/admin/info/del',
        params
    })
}

export function axiosLifes({
    pageNo = 1,
    pageSize = 10 
}) {
    return axios({
        url: '/api/admin/life',
        params: {
            pageNo,
            pageSize
        }
    })
}

export function axiosLifeSave(params) {
    return axios({
        method: 'post',
        url: '/api/admin/life/save',
        params
    })
}

export function axiosLifeDel(params) {
    return axios({
        method: 'post',
        url: '/api/admin/life/del'
    })
}


export function axiosLifeImages({
    topic,
    pageNo = 1,
    pageSize = 10 
}) {
    return axios({
        url: '/api/admin/lifeImage',
        params: {
            topic,
            pageNo,
            pageSize
        }
    })
}

export function axioslifeImageSave(params) {
    return axios({
        method: 'post',
        url: '/api/admin/lifeImage/save',
        params
    })
}

export function axioslifeImageDel(params) {
    return axios({
        method: 'post',
        url: '/api/admin/lifeImage/del'
    })
}


export function axiosIntro() {
    return axios({
        url: '/api/admin/intro'
    })
}

export function axiosIntroSave(params) {
    return axios({
        method: 'post',
        url: '/api/admin/intro/save',
        params
    })
}

export function axiosMenu(params) {
    return axios({
        url: '/api/admin/menu',
        params
    })
}

export function axiosMenuSave(params) {
    return axios({
        method: 'post',
        url: '/api/admin/menu/save',
        params
    })
}

export function axiosMenuDel(params) {
    return axios({
        method: 'post',
        url: '/api/admin/menu/del',
        params
    })
}