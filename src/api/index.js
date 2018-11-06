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