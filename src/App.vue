<template>
    <v-app>
        <v-content>

            <!-- <v-navigation-drawer></v-navigation-drawer> -->
            <v-toolbar>

                <v-menu
                    offset-y
                    transition="slide-x-transition"
                    bottom
                    right
                >

                    <v-toolbar-side-icon class="hidden-md-and-up" slot="activator"></v-toolbar-side-icon>

                    <v-list>

                        <v-list-tile>
                            <v-list-tile-title v-if="isAuthenticated" @click="logout()">Выйти</v-list-tile-title>
                            <v-list-tile-title v-else @click="goToLogin()">Войти</v-list-tile-title>
                        </v-list-tile>

                    </v-list>

                </v-menu>

                <v-toolbar-title>Исполнитель желаний</v-toolbar-title>

                <v-spacer></v-spacer>

                <div v-if="isAuthenticated" class="toolbar-email">{{user.email}}</div>

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
        user() {
            return this.$store.getters.getUser;
        }
    },

    mounted() {
        this.$store.dispatch('initCallbacks');
    },

    methods : {
        goToLogin() {
            this.$router.push( { name : 'Login' } );
        },
        logout() {
            this.$store.dispatch('logout')
                .then( () => this.goToLogin() )
        }
    },
};
</script>

<style lang="less">
    @import "./animation.less";

    .toolbar-email {
        padding: 15px;
    }
</style>
