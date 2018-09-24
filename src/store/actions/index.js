import { URL_API, API_PATH } from '@/utils/config';
import axios from 'axios'

window.axios = axios;

axios.defaults.headers = {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With' : 'XMLHttpRequest',
    // 'crossDomain'      : true,
    // 'credentials' : 'same-origin',
    // 'Content-Type'     : 'application/x-www-form-urlencoded',`
}

axios.defaults.baseURL = URL_API
axios.defaults.withCredentials = true


export default {
    createUser({ commit }, user) {
        console.log( user );

        return axios.post('register', user );
    },

    login({ commit }, user) {
        return axios.post('signin', user );
    },
};
