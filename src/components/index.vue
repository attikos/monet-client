<template>
    <v-layout column>
        <v-flex xs12>

            <v-container fluid grid-list-lg>

                <v-alert
                  v-model="successRegister"
                  color="success"
                  dismissible
                  outline
                >
                  Welcome!!!
                </v-alert>

                <v-layout row wrap>

                    <v-flex xs12 sm6>
                        <input-card
                            cardName="income"
                            title="Доход"
                            :listRows="income.rows"
                        ></input-card>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <input-card
                            cardName="outcome"
                            title="Расход"
                            :listRows="outcome.rows"
                        ></input-card>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <input-card
                            cardName="wish"
                            title="Желания"
                            :listRows="wish.rows"
                        ></input-card>
                    </v-flex>

                </v-layout>

                <v-layout column wrap>

                    <v-flex xs12 sm12>
                        <v-card class="lighten-9 elevation-3">

                            <v-card-title primary-title>
                                <h3 class="headline mb-0">Результат</h3>
                            </v-card-title>

                            <v-card-text>
                                Суммарный доход: {{ money( income.sumRows ) }}
                                <br />
                                Суммарный расход: {{ money( outcome.sumRows ) }}
                            </v-card-text>

                            <v-card-text :class="{ 'red--text' : resultCost < 0 }">
                                Ежемесячный денежный поток: {{ resultCost > 0 ? '+' : resultCost < 0 ? '-' : '' }}{{ money( resultCost ) }}
                            </v-card-text>

                            <v-card-text :class="{ 'red--text' : resultCost < 0 }" v-if="resultWish.months">
                                Желания исполнятся через: {{ resultWish.months }} месяцев.
                                <br>
                                Общая стоимость желаний: {{ money( wish.sumRows ) }}
                            </v-card-text>

                        </v-card>
                    </v-flex>

                </v-layout>

            </v-container>

        </v-flex>
    </v-layout>
</template>

<script>
import inputCard from './input-card.vue'
import { sumRowValues } from '@/utils/main.js'

export default {
    name: 'index',

    components: {
        inputCard,
    },

    data() {
        return {
            successRegister : true,
        };
    },

    computed: {
        income() {
            return this.createTable('income');
        },
        outcome() {
            return this.createTable('outcome');
        },
        wish() {
            return this.createTable('wish');
        },
        resultCost() {
            return this.income.sumRows - this.outcome.sumRows || 0;
        },
        resultWish() {
            return {
                months : this.resultCost ? ( this.wish.sumRows / this.resultCost ).toFixed(2) : 0,
                years  : ~~ ( ( this.wish.sumRows / this.resultCost ) / 12 ),
            };
        }
    },

    methods: {
        createTable( tableName ) {
            let data = [ ...this.$store.state[ tableName ] ];

            return {
                rows    : data,
                sumRows : sumRowValues( data ),
            };
        },
    },

    mounted() {
        this.successRegister = this.$store.getters.getIsWelcome;
    },

    watch: {
        successRegister( val ) {
            this.$store.commit('SET_IS_WELCOME', val);
        },
    },
};
</script>

<style scoped lang="less">
    .card .button-card {
        bottom: 16px;
    }
</style>
