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
                @deleteTableRow="openConfirm( item )"
                @openSettings="openSettings( item )"
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

                <v-icon>add</v-icon>

            </v-btn>

        </v-card-actions>

        <v-dialog
            v-model="isDialogForm"
            max-width="600px"
            @keydown.esc="isDialogForm = false"
        >
            <form @submit.prevent="saveTransaction()">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ modalTitle }}</span>
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

                                <v-flex xs12 sm12 md12>
                                    <v-menu
                                      lazy
                                      :close-on-content-click="false"
                                      v-model="menuDatePicker"
                                      transition="scale-transition"
                                      offset-y
                                      full-width
                                      :nudge-right="40"
                                      max-width="290px"
                                      min-width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            label="Дата завершения"
                                            :value="dateFormat( currentItem.finished_at )"
                                            prepend-icon="event"
                                            readonly
                                        ></v-text-field>

                                        <v-date-picker
                                            v-model="currentItem.finished_at"
                                            no-title
                                            scrollable
                                            locale="ru-ru"
                                            autosave
                                        ></v-date-picker>

                                    </v-menu>

                                </v-flex>


                                <v-flex xs12 sm6 md-6>
                                    <v-select
                                        v-model="currentItem.period"
                                        :items="['day', 'week', 'month', 'year']"
                                        label="Периодичность"
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12 sm6 md-6>
                                    <v-text-field
                                        v-model="currentItem.period_value"
                                        type="number" step="1" min="1" max="255"
                                        label="Повторений"
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="blue darken-1" flat @click="isDialogForm = false">Отмена</v-btn>
                        <v-btn color="blue darken-1" flat type="submit">Сохранить</v-btn>
                    </v-card-actions>

                </v-card>
            </form>

        </v-dialog>

    </v-card>
</template>

<script>
import tableRow from '@/components/table-row/table-row.vue'

const langs = {
    income: 'Доход',
    outcome: 'Расход',
    wish: 'Желание',
}

export default {
    props : [ 'cardName', 'title', 'listRows' ],

    components: {
        tableRow,
    },

    data() {
        return {
            fields: {
                date: '',
                period: '',
                repeat: '',
            },
            isDialogForm: false,
            currentItem: {},
            menuDatePicker: false,
        }
    },

    computed: {
        modalTitle() {
            return langs[ this.cardName ]
        },
    },

    methods: {
        closeDatepicker() {
            thid.menuDatePicker = false;
        },

        dateFormat( dateString ) {
            return dateString ? moment( dateString ).format('DD MMMM YYYY') : ''
        },

        dateFormatShort( dateString ) {
            return dateString ? moment( dateString ).format('DD-MM-YYYY') : ''
        },

        moment: window.moment,

        async saveTransaction() {
            await this.$store.dispatch( 'updateTransaction', this.currentItem )

            this.isDialogForm = false
        },

        openNewForm( cardName ) {
            this.currentItem = {
                type: cardName,
            }

            this.isDialogForm = true
        },

        openSettings( item ){
            this.currentItem = Object.assign( {}, item )

            // let date = this.currentItem.finished_at

            // console.log( date )

            // this.currentItem.finished_at = date
            //     ? moment( date ).format('YYYY-MM-DD')
            //     : new Date().toISOString().substr(0, 10)

            // console.log( this.currentItem.finished_at )


            this.isDialogForm = true
        },

        saveCell( item, data ) {
            this.$store.dispatch( 'updateTransaction',
                {
                    _id               : item._id,
                    [ data.cellName ] : data.val,
                }
            )
        },
        deleteTableRow( item ) {
            this.$store.dispatch( 'deleteTransaction', { _id: item._id } )
        },
        async openConfirm( item ) {
            this.currentItem = item

            let textChip = `<span tabindex="0" class="chip chip--outline primary primary--text"><span class="chip__content">${ item.title } - ${ item.amount }</span></span>`

            const res = await this.$dialog.confirm({
                text: `Удалить ${ langs[ this.cardName ].toLowerCase() } ${ textChip }</i>?`,
                title: 'Внимание',
            })

            res && this.deleteTableRow( item )
        },
    },

    watch: {
        currentItem() {
            // убираем лишние копейки
            this.$set( this.currentItem, 'amount', +this.currentItem.amount )
        }
    },
}
</script>

<style>

</style>
