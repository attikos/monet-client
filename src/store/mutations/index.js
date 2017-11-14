import findIndex from 'lodash/findIndex';

const sortByKey = ( key ) => ( a, b ) => {
    if (a[ key ] < b[ key ])
        return -1;
    if (a[ key ] > b[ key ])
        return 1;
    return 0;
}

export default {
    FETCH_DATA( state, { service, data } ) {
        state[service] = data.sort( sortByKey( 'label' ) );
    },

    ADD_INCOME_ITEM( state, data ) {
        state.incomeCash.push( data );
        state.incomeCash.sort( sortByKey( 'label' ) );
    },

    REMOVE_INCOME_ITEM( state, data ) {
        let index = findIndex( state.incomeCash, { _id: data._id } );
        state.incomeCash.splice( index, 1 );
    },

    UPDATE_INCOME_ITEM( state, data ) {
        let index = findIndex( state.incomeCash, { _id: data._id } );
        state.incomeCash.splice( index, 1, data );
        state.incomeCash.sort( sortByKey( 'label' ) );
    },


    ADD_COST_ITEM( state, data ) {
        state.costCash.push( data );
        state.costCash.sort( sortByKey( 'label' ) );
    },

    REMOVE_COST_ITEM( state, data ) {
        let index = findIndex( state.costCash, { _id: data._id } );
        state.costCash.splice( index, 1 );
    },

    UPDATE_COST_ITEM( state, data ) {
        let index = findIndex( state.costCash, { _id: data._id } );
        state.costCash.splice( index, 1, data );
        state.costCash.sort( sortByKey( 'label' ) );
    },


    ADD_WISH_ITEM( state, data ) {
        state.wish.push( data );
        state.wish.sort( sortByKey( 'label' ) );
    },

    REMOVE_WISH_ITEM( state, data ) {
        let index = findIndex( state.wish, { _id: data._id } );
        state.wish.splice( index, 1 );
    },

    UPDATE_WISH_ITEM( state, data ) {
        let index = findIndex( state.wish, { _id: data._id } );
        state.wish.splice( index, 1, data );
        state.wish.sort( sortByKey( 'label' ) );
    },

    SET_AUTHENTICATED( state, data ) {
        state.user.isAuthenticated = data;
    },
}
