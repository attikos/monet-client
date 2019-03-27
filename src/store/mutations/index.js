import findIndex from 'lodash/findIndex';

const sortByKey = ( key ) => ( a, b ) => {
    if (a[ key ] < b[ key ])
        return -1;
    if (a[ key ] > b[ key ])
        return 1;
    return 0;
}

const applyTransactionList = function( state, tnList ) {
    state.income  = [];
    state.outcome = [];
    state.wish    = [];

    if ( tnList && tnList.length ) {
        tnList.forEach( tn => {
            state[ tn.type ].push( tn );
        });
    }
}

export default {
    FETCH_DATA( state, { transaction_list } ) {
        applyTransactionList( state, transaction_list );
    },

    SET_AUTH_STATE( state, data ) {
        state.isAuthenticated = data;
    },

    SET_USER( state, data ) {
        state.user = data;
    },

    LOGOUT( state, data ) {
        state.user = {
            email : '',
        };
        state.income  = [];
        state.outcome = [];
        state.wish    = [];
    }
}
