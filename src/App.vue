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

// TODO для дебага, выпилить
import { services, app } from '@/services/';
window.services = services;
window.app = app;

const loginPage = '/login';

export default {
    name: 'app',

    computed : {
        showLoginButton() {
            return ![ 'Login', 'Signup' ].includes( this.$route.name );
        },
        isAuthenticated() {
            return this.$store.getters.getAuthState;
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
};
</script>

<style lang="less">
    @import "./animation.less";
</style>
