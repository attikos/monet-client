<template>
    <v-dialog
        v-model="isShow"
        width="600px"
    >

        <v-card>
            <v-card-title>
                <div class="headline"><strong>{{ title }}</strong></div>
            </v-card-title>

            <v-card-text>
                <slot name="content">
                    <p>Вы уверены?</p>
                </slot>
            </v-card-text>

            <v-card-actions>

                <v-btn @click.native="$emit('cancel')">Нет</v-btn>

                <v-spacer/>

                <v-btn
                    dark
                    color="done"
                    @click.native="$emit('confirm')"
                >Да</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name : 'confirm',

    props : {
        title: {
            type    : String,
            default : '',
        },
        isShow : {
            type    : Boolean,
            default : false,
        },
    },
};
</script>
