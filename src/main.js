// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import('vuetify/dist/vuetify.min.css')
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/'
import Vuetify from 'vuetify'

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
                currency : 'RUR',
            },
        }
    },
    methods: {
        money( val, currency ) {
            let value,
                symbol;

            switch ( currency || this.config.currency ) {
                case 'RU':
                case 'RUB':
                case 'RUR':
                    value = ( val * 1 )
                        .toFixed( 2 )
                        .replace( '.', ',' )
                        .replace( /\B(?=(\d{3})+(?!\d))/g, ' ' );

                    return `${value} ₽`;

                case 'EN':
                case 'US':
                    value = ( val * 1 )
                        .toFixed( 2 )
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
