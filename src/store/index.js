import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use( Vuex );

const state = {
    incomeCash : [],
    costCash   : [],
    wish       : [],
};

export default new Vuex.Store({
    actions,
    mutations,
    state,
});
