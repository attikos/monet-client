<template>
    <div>
        <!-- <v-navigation-drawer></v-navigation-drawer> -->
        <v-toolbar>
            <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-title>Исполняющий желания</v-toolbar-title>

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
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        this.$store.dispatch('initCallbacks');
        this.$store.dispatch('fetchData', 'incomeCash');
        this.$store.dispatch('fetchData', 'costCash');
        this.$store.dispatch('fetchData', 'wish');
    },
}
</script>

<style lang="less">
    @import "./animation.less";
</style>
