import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'

const lazyLoad = ( path ) => () => import( `@/components/${path}` );


Vue.use( Router )

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: lazyLoad('index'),
            meta: { requiresAuth : true },
        },
        {
            path: '/login',
            name: 'Login',
            component: lazyLoad('login'),
        },
        {
            path: '/signup',
            name: 'Signup',
            component: lazyLoad('signup'),
        },
        {
            path: '*',
            redirect : '/',
        },
    ]
});

router.beforeEach( ( to, from, next ) => {

    const redirectToRoot = function() {

        if ( [ 'Login', 'Signup' ].includes( to.name ) ) {
            next( '/' );
        }
        else {
            next();
        }
    }

    if ( store.getters.getAuthState === undefined ) {

        store.dispatch('authenticate')
            .then( redirectToRoot )
            .catch( () => {
                if ( to.meta.requiresAuth ) {
                    next( '/login' );
                }
                else {
                    next();
                }
            } );

    }
    else if ( store.getters.getAuthState ) {
        redirectToRoot();
    }
    else if ( to.meta.requiresAuth ) {
        next( '/login' );
    }
    else {
        next();
    }

} );

export default router;
