<template>
    <main class="container">

        <h1 class="font-100">Регистрация</h1>

        <v-form v-model="isValidForm" ref="form" lazy-validation @submit.stop.prevent="submit">

            <v-alert
                v-model="isErrorMessage"
                type="error"
                dismissible
                outline
            >
              {{ errorMessage }}
            </v-alert>

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
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(v) || 'Некорректный e-mail'
            ],
            password      : '',
            passwordRules : [
                (v) => !!v || 'Пароль обязателен',
                (v) => v.length >= MIN_PASSWORD_LENGTH || `Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов`
            ],
            errorMessage : '',
            isErrorMessage : false,
        }
    },

    methods : {
        submit() {
            if ( this.isValidForm ) {
                this.errorMessage = '';

                this.signup( this.email, this.password );
            }
        },
        async signup( email, password ) {

            try {

                let data = await this.$store.dispatch( "createUser", { email, password } );

                if ( data && data.error_message ) {
                    return this.errorMessage = data.error_message;
                }

                this.$router.push( { name : 'Index'} );

            } catch( err ) {
                console.log(err);
            };
        },
        toLogin() {
            this.$router.push( { name: 'Login' } );
        }
    },

    watch: {
        errorMessage( val ) {
            this.isErrorMessage = !!this.errorMessage;
        },
    },
}
</script>

<style>

</style>
