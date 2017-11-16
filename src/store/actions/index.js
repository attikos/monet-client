import { services, app } from '@/services/';

export default {
    initCallbacks: ( { commit } ) => {
        services.incomeCash.on('created', data => {
            commit( 'ADD_INCOME_ITEM', data );
        });

        services.incomeCash.on('removed', data => {
            commit( 'REMOVE_INCOME_ITEM', data );
        });

        services.incomeCash.on('updated', data => {
            commit( 'UPDATE_INCOME_ITEM', data );
        });


        services.costCash.on('created', data => {
            commit( 'ADD_COST_ITEM', data );
        });

        services.costCash.on('removed', data => {
            commit( 'REMOVE_COST_ITEM', data );
        });

        services.costCash.on('updated', data => {
            commit( 'UPDATE_COST_ITEM', data );
        });


        services.wish.on('created', data => {
            commit( 'ADD_WISH_ITEM', data );
        });

        services.wish.on('removed', data => {
            commit( 'REMOVE_WISH_ITEM', data );
        });

        services.wish.on('updated', data => {
            commit( 'UPDATE_WISH_ITEM', data );
        });
    },

    fetchData: ( { commit }, service ) => {
        services[service].find({}).then( data => {
            commit( 'FETCH_DATA', { service, data: data.data } );
        } )
    },

    // async
    updateService( { commit }, { service, id, data } ) {
        services[ service ].update( id, data );
    },

    // async
    createService( { commit }, { service, data } ) {
        services[ service ].create( data );
    },

    // async
    removeService( { commit }, { service, id } ) {
        services[ service ].remove( id );
    },

    createUser( { commit }, user ) {
        return new Promise( ( resolve, reject ) => {

            app.service('users').create( user )
                .then( res => resolve( res ) )
                .catch( err => reject( err ) );

        } );
    },

    logout() {
        return new Promise( ( resolve, reject ) => {

            app.logout()
                .then( res => resolve( res ) )
                .catch( err => reject( err ) );

        } );
    },

    authenticate( { commit }, data ) {
        return new Promise( ( resolve, reject ) => {

            app.authenticate( data )
                .then( ( res ) => {

                    commit( 'SET_AUTHENTICATED', true );

                    resolve( res );
                } )
                .catch( err => {

                    if ( err.code === 401 ) {
                        commit( 'SET_AUTHENTICATED', false );
                    }

                    reject( err );
                })
        });
    },
}
