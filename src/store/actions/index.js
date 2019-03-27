import { URL_API, API_PATH } from '@/utils/config';
import axios from 'axios'

window.axios = axios;

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'X-Requested-With' : 'XMLHttpRequest',
}

axios.defaults.baseURL = URL_API
axios.defaults.withCredentials = true


export default {
    createUser({ commit, dispatch }, user) {
        return new Promise( async (resolve, reject) => {
            try {
                let { data } = await axios.post('register', user );

                if ( data && data.error_message ) {
                    commit('SET_AUTH_STATE', false);

                    return resolve( data );
                }

                commit('SET_IS_WELCOME', true);
                commit('SET_AUTH_STATE', true);
                commit('SET_USER', { email : data.email });

                await dispatch('fetchData');

                resolve();
            }
            catch( err ) {
                if ( err.response && err.response.status === 401 ) {
                    commit('SET_AUTH_STATE', false);
                }

                reject( err );
            };

        });
    },

    authenticate({ commit, dispatch }, user) {
        return new Promise( async (resolve, reject) => {
            try {
                let { data } = await axios.post('signin', user );

                commit('SET_AUTH_STATE', true);
                commit('SET_USER', { email : data.email });

                await dispatch('fetchData');

                resolve();
            }
            catch( err ) {
                if ( err.response && err.response.status === 401 ) {
                    commit('SET_AUTH_STATE', false);
                }

                reject( err );
            };

        });
    },

    logout({ commit, dispatch }) {
        return new Promise( async (resolve, reject) => {

            try {
                await axios.post('logout');

                commit('SET_AUTH_STATE', false);
                commit('LOGOUT');

                resolve();

            }
            catch( err ) { reject( err ) };

        });
    },

    createTransaction: async ( { commit }, transaction ) => {
        let { data } = await axios.post('create_transaction', transaction);

        commit( 'FETCH_DATA', data );
    },

    deleteTransaction: async ( { commit }, transaction ) => {
        let { data } = await axios.post('delete_transaction', transaction);

        commit( 'FETCH_DATA', data );
    },

    updateTransaction: async ( { commit }, transaction ) => {
        let { data } = await axios.post('update_transaction', transaction);

        commit( 'FETCH_DATA', data );
    },

    fetchData: async ( { commit } ) => {
        let { data } = await axios.post('transaction_list');

        commit( 'FETCH_DATA', data );
    },
};
