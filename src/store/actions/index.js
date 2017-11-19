import { services, app } from '@/services/';

export default {
    initCallbacks: ({ commit }) => {
        services.incomeCash.on('created', data => {
            commit('ADD_INCOME_ITEM', data);
        });

        services.incomeCash.on('removed', data => {
            commit('REMOVE_INCOME_ITEM', data);
        });

        services.incomeCash.on('updated', data => {
            commit('UPDATE_INCOME_ITEM', data);
        });


        services.costCash.on('created', data => {
            commit('ADD_COST_ITEM', data);
        });

        services.costCash.on('removed', data => {
            commit('REMOVE_COST_ITEM', data);
        });

        services.costCash.on('updated', data => {
            commit('UPDATE_COST_ITEM', data);
        });


        services.wish.on('created', data => {
            commit('ADD_WISH_ITEM', data);
        });

        services.wish.on('removed', data => {
            commit('REMOVE_WISH_ITEM', data);
        });

        services.wish.on('updated', data => {
            commit('UPDATE_WISH_ITEM', data);
        });
    },

    fetchData: ({ commit, state }, service) => {

        services[service].find( {
            query: {
                userId: state.user._id || '',
            }
        } )
            .then( data => commit( 'FETCH_DATA', { service, data: data.data } ) )

    },

    updateService({ commit, state }, { service, id, data }) {

        services[service].update( id, { ...data, userId : state.user._id } );

    },

    createService({ commit, state }, { service, data }) {

        services[service].create( { ...data, userId: state.user._id } );

    },

    removeService({ commit }, { service, id }) {

        services[service].remove(id);

    },

    createUser({ commit }, user) {
        return new Promise((resolve, reject) => {

            app.service('users').create(user)
                .then(res => resolve(res))
                .catch(err => reject(err));

        });
    },

    authenticate({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {

            app.authenticate(data)
                .then(res => app.passport.verifyJWT(res.accessToken))
                .then(payload => app.service('users').get(payload.userId))
                .then(user => {
                    app.set('user', user);

                    commit('SET_AUTH_STATE', true);
                    commit('SET_USER', user);

                    Promise.all([
                        dispatch('fetchData', 'incomeCash'),
                        dispatch('fetchData', 'costCash'),
                        dispatch('fetchData', 'wish'),
                    ])
                        .then( () => resolve() );

                })
                .catch(err => {

                    if (err.code === 401) {
                        commit('SET_AUTH_STATE', false);
                    }

                    reject(err);
                })
        });
    },

    logout({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {

            app.logout()
                .then(res => {
                    app.set('user', null);

                    commit('SET_AUTH_STATE', false);
                    commit('SET_USER', {
                        user : {
                            email : '',
                            _id   : '',
                        },
                    });

                    Promise.all([
                        dispatch('fetchData', 'incomeCash'),
                        dispatch('fetchData', 'costCash'),
                        dispatch('fetchData', 'wish'),
                    ])
                        .then( () => resolve() );
                })
                .catch(err => reject(err));

        });
    },

}
