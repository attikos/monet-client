import { services, app } from '@/services/';

const filterData = function( data ) {
    let filterData;

    if ( data.length ) {
        data.filter( x => x.userId === state.user._id );
    }

    if ( !filterData.length ) {
        data = [];
    }
}

export default {
    initCallbacks: ({ commit, state }) => {

        services.incomeCash.on('created', data => {
            data.userId === state.user._id && commit('ADD_INCOME_ITEM', data);
        });

        services.incomeCash.on('removed', data => {
            data.userId === state.user._id && commit('REMOVE_INCOME_ITEM', data);
        });

        services.incomeCash.on('updated', data => {
           data.userId === state.user._id && commit('UPDATE_INCOME_ITEM', data);
        });


        services.costCash.on('created', data => {
            data.userId === state.user._id && commit('ADD_COST_ITEM', data);
        });

        services.costCash.on('removed', data => {
            data.userId === state.user._id && commit('REMOVE_COST_ITEM', data);
        });

        services.costCash.on('updated', data => {
            data.userId === state.user._id && commit('UPDATE_COST_ITEM', data);
        });


        services.wish.on('created', data => {
            data.userId === state.user._id && commit('ADD_WISH_ITEM', data);
        });

        services.wish.on('removed', data => {
            data.userId === state.user._id && commit('REMOVE_WISH_ITEM', data);
        });

        services.wish.on('updated', data => {
            data.userId === state.user._id && commit('UPDATE_WISH_ITEM', data);
        });
    },

    fetchData: async ( { commit, state }, service ) => {

        let { data } = await services[service].find( {
            query: {
                userId: state.user._id || '',
            }
        } );

        commit( 'FETCH_DATA', { service, data } );

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
        return new Promise( async (resolve, reject) => {

            try {
                resolve( await app.service('users').create(user) );
            }
            catch( err ) { reject( err ) };

        });
    },

    authenticate({ commit, dispatch }, data) {
        return new Promise( async (resolve, reject) => {

            try {
                let { accessToken } = await app.authenticate(data);
                let { userId }      = await app.passport.verifyJWT( accessToken );
                let user            = await app.service('users').get( userId );

                app.set('user', user);

                commit('SET_AUTH_STATE', true);
                commit('SET_USER', user);

                await Promise.all([
                    dispatch('fetchData', 'incomeCash'),
                    dispatch('fetchData', 'costCash'),
                    dispatch('fetchData', 'wish'),
                ]);

                resolve();

            }
            catch( err ) {

                if ( err.code === 401 ) {
                    commit('SET_AUTH_STATE', false);
                }

                reject( err );
            };

        });
    },

    logout({ commit, dispatch }, data) {
        return new Promise( async (resolve, reject) => {

            try {
                await app.logout();

                app.set('user', null);

                commit('SET_AUTH_STATE', false);
                commit('SET_USER', {
                    user : {
                        email : '',
                        _id   : '',
                    },
                });

                await Promise.all([
                    dispatch('fetchData', 'incomeCash'),
                    dispatch('fetchData', 'costCash'),
                    dispatch('fetchData', 'wish'),
                ]);

                resolve();

            }
            catch( err ) { reject( err ) };

        });
    },

}
