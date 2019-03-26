import findIndex from 'lodash/findIndex';

const sortByKey = ( key ) => ( a, b ) => {
    if (a[ key ] < b[ key ])
        return -1;
    if (a[ key ] > b[ key ])
        return 1;
    return 0;
}

const applyTransactionList = function( state, tnList ) {
    if ( tnList && tnList.length ) {
        state.income  = [];
        state.outcome = [];
        state.wish    = [];

        tnList.forEach( tn => {
            state[ tn.type ].push( tn );
        });
    }
}

export default {
    FETCH_DATA( state, { transaction_list } ) {
        applyTransactionList( state, transaction_list );
    },

    CREATE_TRANSACTION ( state, { transaction_list } ) {
        applyTransactionList( state, transaction_list );
        // state[ tn.type ].push( tn );
        // state[ tn.type ].sort( sortByKey('label') );
    },

    // ADD_INCOME_ITEM( state, data ) {
    //     state.income.push( data );
    //     state.income.sort( sortByKey('title') );
    // },

    // REMOVE_INCOME_ITEM( state, data ) {
    //     let index = findIndex( state.income, { _id: data._id } );
    //     state.income.splice( index, 1 );
    // },

    // UPDATE_INCOME_ITEM( state, data ) {
    //     let index = findIndex( state.income, { _id: data._id } );
    //     state.income.splice( index, 1, data );
    //     state.income.sort( sortByKey('title') );
    // },


    // ADD_OUTCOME_ITEM( state, data ) {
    //     state.outcome.push( data );
    //     state.outcome.sort( sortByKey('title') );
    // },

    // REMOVE_OUTCOME_ITEM( state, data ) {
    //     let index = findIndex( state.outcome, { _id: data._id } );
    //     state.outcome.splice( index, 1 );
    // },

    // UPDATE_OUTCOME_ITEM( state, data ) {
    //     let index = findIndex( state.outcome, { _id: data._id } );
    //     state.outcome.splice( index, 1, data );
    //     state.outcome.sort( sortByKey('title') );
    // },


    // ADD_WISH_ITEM( state, data ) {
    //     state.wish.push( data );
    //     state.wish.sort( sortByKey('title') );
    // },

    // REMOVE_WISH_ITEM( state, data ) {
    //     let index = findIndex( state.wish, { _id: data._id } );
    //     state.wish.splice( index, 1 );
    // },

    // UPDATE_WISH_ITEM( state, data ) {
    //     let index = findIndex( state.wish, { _id: data._id } );
    //     state.wish.splice( index, 1, data );
    //     state.wish.sort( sortByKey('title') );
    // },

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
