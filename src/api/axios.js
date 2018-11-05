import axios from 'axios';
import Vue from 'vue';

export const baseAPI = document.location.protocol + '//' + document.location.host;

export default (opts) => {
    const {
        method = 'get', url, params = {}, headers = {}
    } = opts;


    return new Promise((resolve, reject) => {
        axios({
            method: method,
            baseURL: baseAPI,
            url: url,
            headers,
            params: method == 'get' ? params : {},
            data: method == 'post' ? params : {}
        }).then(function (response) {
            let _data = response.data;
            if (_data.result == '1' || _data.status == '1') {
                return resolve(_data);
            } else {
                Vue.prototype.$message.error({
                    message: _data.msg
                });
                return reject(_data);
            }
        }).catch(function (error) {
            Vue.prototype.$message.error({
                message: '网络链接错误，请检查网络设置'
            });
            return reject(error);
        })
    })
}