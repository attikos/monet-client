import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'

const user = store.getters.getUser;
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
    ]
});

router.beforeEach( ( to, from, next ) => {
    if ( user.isAuthenticated === undefined ) {

        store.dispatch('authenticate')
            .then( () => next( '/' ) )
            .catch( () => next( '/login' ) );
    }

    next();
} );

export default router;
