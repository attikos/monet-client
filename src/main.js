import('vuetify/dist/vuetify.min.css')

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/'
import Vuetify from 'vuetify'
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

Vue.use(Vuetify)
Vue.use(Vuex)

Vue.config.productionTip = false

Vue.directive( 'focus', {
    inserted: function ( el ) {
        el.focus();
    }
})

Vue.mixin({
    data() {
        return {
            config : {
                currency : 'RUB',
            },
        }
    },
    methods: {
        money( val, currency ) {
            let value,
                symbol;

            switch ( currency || this.config.currency ) {
                case 'RUB':
                    value = ( val * 1 )
                        .toFixed( 0 )
                        .replace( '.', ',' )
                        .replace( /\B(?=(\d{3})+(?!\d))/g, ' ' );

                    return `${value} ₽`;

                case 'USD':
                    value = ( val * 1 )
                        .toFixed( 0 )
                        .replace( ',', '.' )
                        .replace( /\B(?=(\d{3})+(?!\d))/g, ',' );

                    return `$${value}`;

                default:
                    break;
            }

            retutn `${val}`;
        },
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
})

Object.assign( window, {
    moment,
} );

