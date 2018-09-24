<template>
    <main class="container">

        <h1 class="font-100">Авторизация</h1>

        <v-form v-model="isValidForm" ref="form" lazy-validation @submit.stop.prevent="submit">

            <label class="red--text" v-if="errorLogin">Неверный логин или пароль</label>

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
                Войти
            </v-btn>

            <v-btn @click="toSignup()">Зарегистрироваться</v-btn>

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
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(v) || 'Некорректный e-mail'
            ],
            password      : '',
            passwordRules : [
                (v) => !!v || 'Пароль обязателен',
                (v) => v.length >= MIN_PASSWORD_LENGTH
                    || `Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов`
            ],
            errorLogin : false,
        }
    },

    methods : {
        async auth( email, password ) {
            try {

                let a = await this.$store.dispatch( "login", { email, password } );
                console.log(a)

                // await this.$store.dispatch( 'authenticate', { strategy: 'local', email, password } )
                this.$router.push( { name : 'Index' } );

            } catch( err ) {

                if ( err.code === 401 ) {
                    this.errorLogin = true;
                }

            };
        },
        submit() {
            if ( this.isValidForm ) {
                this.errorLogin = false;

                this.auth( this.email, this.password );
            }
        },
        toSignup() {
            this.$router.push( { name: 'Signup' } );
        },
    },
}
</script>

<style>

</style>
