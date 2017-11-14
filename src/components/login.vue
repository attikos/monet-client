<template>
    <main class="container">

        <h1 class="font-100">Рады Вас снова видеть</h1>

        <v-form @submit.stop.prevent="auth( email, password )">

            <v-text-field
                label="Email"
                v-model="email"
                required
            ></v-text-field>

            <v-text-field
                label="Пароль"
                v-model="password"
                required
            ></v-text-field>

            <v-btn
                @click="auth( email, password )"
            >
                Войти
            </v-btn>

            <v-btn @click="signin">Зарегистрироваться</v-btn>

        </v-form>

    </main>
</template>

<script>
import { app } from '@/services/';

export default {
    data () {
        return {
            email    : '',
            password : '',
        }
    },
    methods : {
        auth( email, password ) {
            app.authenticate( { strategy: 'local', email, password } );
        },
        signin() {
            return;
        },
    },
}
</script>

<style>

</style>
