import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
// import Index from '@/components/index1'
// const Index = () => import('@/components/Index');
// const Index = () => import('@/components/index1')


const lazyLoad = ( path ) => () => import( `@/components/${path}` );

// console.dir( getComponent('Index')().then( ( res ) => console.dir( res ) ) );

Vue.use( Router )

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: lazyLoad('index'),
            // component: Index,
        },
        {
            path: '/login',
            name: 'Login',
            component: lazyLoad('login'),
        }
    ]
})
