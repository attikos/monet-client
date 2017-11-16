<template>
    <main class="container">

        <h1 class="font-100">Регистрация</h1>

        <v-form v-model="isValidForm" ref="form" lazy-validation @submit.stop.prevent="submit">

            <v-text-field
                label="Email"
                type="email"
                name="email"
                v-model="email"
                :rules="emailRules"
                required
            ></v-text-field>

            <v-text-field
                label="Пароль"
                type="password"
                name="password"
                v-model="password"
                :rules="passwordRules"
                required
            ></v-text-field>

            <v-btn
                type="submit"
                color="light-green"
                :disabled="!isValidForm"
            >
                Зарегистрироваться
            </v-btn>

            <v-btn @click="toLogin()">Войти</v-btn>

        </v-form>

    </main>
</template>

<script>
import { MIN_PASSWORD_LENGTH } from '@/utils/config';

export default {
    data () {
        return {
            isValidForm : false,
            email       : '',
            emailRules  : [
                (v) => !!v || 'E-mail обязателен',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Некорректный e-mail'
            ],
            password      : '',
            passwordRules : [
                (v) => !!v || 'Пароль обязателен',
                (v) => v.length >= MIN_PASSWORD_LENGTH || `Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов`
            ],
        }
    },

    methods : {
        submit() {
            if ( this.isValidForm ) {
                this.signup( this.email, this.password );
            }
        },
        signup( email, password ) {
            this.$store.dispatch( "createUser", { email, password } )
                .then( response => {
                    this.$store.dispatch( "authenticate", { strategy: 'local', email, password } );

                    this.$router.push( { name : 'Index'} );
                 })
                 .catch( err => console.dir( err ) );
        },
        toLogin() {
            this.$router.push( { name: 'Login' } );
        }
    },
}
</script>

<style>

</style>
