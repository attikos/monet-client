<template>
    <v-app>
        <v-content>

            <!-- <v-navigation-drawer></v-navigation-drawer> -->
            <v-toolbar>
                <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
                <v-toolbar-title>Исполнитель желаний</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items v-if="showLoginButton" class="hidden-sm-and-down">
                    <v-btn v-if="isAuthenticated" flat @click="logout()">Выйти</v-btn>
                    <v-btn v-else flat @click="goToLogin()">Войти</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <main>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </main>

        </v-content>
    </v-app>
</template>

<script>
const loginPage = '/login';
export default {
    name: 'app',

    computed : {
        showLoginButton() {
            return ![ 'Login', 'Signup' ].includes( this.$route.name );
        },
        isAuthenticated() {
            return this.$store.getters.getUser.isAuthenticated;
        },
    },

    mounted() {
        this.$store.dispatch('initCallbacks');
        this.$store.dispatch('fetchData', 'incomeCash');
        this.$store.dispatch('fetchData', 'costCash');
        this.$store.dispatch('fetchData', 'wish');
    },

    methods : {
        goToLogin() {
            this.$router.push( { name : 'Login' } );
        },
        logout() {
            this.$store.dispatch('logout')
                .then( () => {
                    this.goToLogin();
                } )
        }
    },

    // created() {
    //     // if ( window.location.pathname !== loginPage ) {

    //         this.$store.dispatch('authenticate')
    //             .catch( error => {
    //                 // if ( error.code === 401 ) window.location.href = loginPage;
    //                 // if ( error.code === 401 ) this.$router.push( { name: 'Login' } );
    //             });
    //     // }
    // },
};
</script>

<style lang="less">
    @import "./animation.less";
</style>
