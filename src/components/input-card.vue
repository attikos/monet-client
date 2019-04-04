<template>
    <v-card class="lighten-9 elevation-3 mb-4">

        <v-card-title primary-title>

            <h3 class="headline mb-0">{{ title }}</h3>

        </v-card-title>

        <v-card-text>

            <tableRow
                v-for="item in listRows"
                :itemTitle="item.title"
                :itemAmount="item.amount"
                :key="item._id"
                @saveCell="saveCell( item, $event )"
                @deleteTableRow="deleteTableRow( item )"
                @openSettings="openSettings( item )"
            ></tableRow>

            <tableRow
                v-if="isShowNewFields"
                key="newTableRow"
                @saveCell="addCell( $event )"
                @deleteTableRow="hideNewFields"
            ></tableRow>

        </v-card-text>

        <v-card-actions>

            <v-btn
                absolute
                dark
                fab
                bottom
                right
                small
                class="light-blue button-card"
                @click.stop="openNewForm( cardName )"
            >
                <!-- @click="showNewFields" -->

                <v-icon>add</v-icon>

            </v-btn>

        </v-card-actions>

        <v-dialog
            v-model="dialog"
            max-width="600px"
        >
            <form @submit.prevent="saveTransaction()">
                <v-card>
                    <v-card-title>
                        <span class="headline">Transaction</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>


                                <v-flex xs12 sm6 md6>
                                    <v-text-field label="Название" required v-model="currentItem.title"></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field label="Сумма" type="number" step="0.01" required v-model="currentItem.amount"></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md-6>
                                    <v-select
                                        :items="['0-17', '18-29', '30-54', '54+']"
                                        label="Периодичность"

                                    ></v-select>

                                    <v-text-field label="Повторений" ></v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Отмена</v-btn>
                        <v-btn color="blue darken-1" flat type="submit">Сохранить</v-btn>
                    </v-card-actions>

                </v-card>
            </form>

        </v-dialog>

    </v-card>
</template>

<script>
import tableRow from '@/components/table-row/table-row.vue'

export default {
    props : [ 'cardName', 'title', 'listRows' ],

    components: {
        tableRow,
    },

    data() {
        return {
            isShowNewFields : false,
            dialog: false,
            currentItem: {},
        }
    },

    methods: {
        async saveTransaction() {
            await this.$store.dispatch( 'updateTransaction', this.currentItem );
            this.dialog = false;
        },

        openNewForm( cardName ) {
            this.currentItem = { type: cardName };
            this.dialog = true;
        },

        openSettings( item ){
            this.currentItem = item;
            this.dialog = true;
        },

        saveCell( item, data ) {
            this.$store.dispatch( 'updateTransaction',
                {
                    _id               : item._id,
                    [ data.cellName ] : data.val,
                }
            );
        },
        addCell( data ) {
            this.hideNewFields();

            this.$store.dispatch( 'createTransaction',
                {
                    type: this.cardName,
                    [ data.cellName ] : data.val,
                }
            );
        },
        deleteTableRow( item ) {
            this.$store.dispatch( 'deleteTransaction', { _id: item._id } );
        },
        showNewFields() {
            this.isShowNewFields = true;
        },
        hideNewFields() {
            this.isShowNewFields = false;
        },
    },

    watch: {
        currentItem() {
            // убираем лишние копейки
            this.$set( this.currentItem, 'amount', +this.currentItem.amount );
        }
    },
}
</script>

<style>

</style>
