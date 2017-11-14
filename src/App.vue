<template>
    <v-app>
        <v-content>

            <!-- <v-navigation-drawer></v-navigation-drawer> -->
            <v-toolbar>
                <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
                <v-toolbar-title>Исполнитель желаний</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat>Войти</v-btn>
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

    data() {
        return {
            user: {
                authenticated: false,
            },
        };
    },

    mounted() {
        this.$store.dispatch('initCallbacks');
        this.$store.dispatch('fetchData', 'incomeCash');
        this.$store.dispatch('fetchData', 'costCash');
        this.$store.dispatch('fetchData', 'wish');
    },

    methods: {
        logout() {
            app.logout().then( () => {
                this.user.authenticated = false;

                window.location.href = loginPage;
            } )
        }
    },

    created() {
        if ( window.location.pathname !== loginPage ) {

            this.$store.dispatch( "authenticate" )
                .catch( error => {
                    if ( error.code === 401 ) window.location.href = loginPage;
                });
        }
    },
};
</script>

<style lang="less">
    @import "./animation.less";
</style>
