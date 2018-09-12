import { URL_API, API_PATH } from '@/utils/config';
import axios from 'axios'

window.axios = axios;

axios.defaults.headers = {
    'X-Requested-With' : 'XMLHttpRequest',
    // 'credentials'      : 'same-origin',
    // 'Content-Type'     : 'application/x-www-form-urlencoded',`
}

axios.defaults.baseURL = URL_API
// axios.defaults.withCredentials = true


export default {
    createUser({ commit }, user) {
        console.log( user );

        return axios.post('register', user );
    },
};
