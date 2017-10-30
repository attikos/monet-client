<template>
    <v-layout column>
        <v-flex xs12>

            <v-container fluid grid-list-lg>

                <v-layout row wrap>

                    <v-flex xs12 sm6>
                        <input-card
                            cardName="incomeCash"
                            title="Доход"
                            :listRows="incomeCash.rows"
                        ></input-card>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <input-card
                            cardName="costCash"
                            title="Расход"
                            :listRows="costCash.rows"
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
                                Суммарный доход: {{ ( incomeCash.sum ) }}
                                <br />
                                Суммарный расход: {{ money( costCash.sum ) }}
                            </v-card-text>

                            <v-card-text :class="{ 'red--text' : resultCost < 0 }">
                                Ежемесячный денежный поток: {{ resultCost > 0 ? '+' : resultCost < 0 ? '-' : '' }}{{ money( resultCost ) }}
                            </v-card-text>

                            <v-card-text :class="{ 'red--text' : resultCost < 0 }">
                                Желания исполнятся через: {{ resultWish.months }} месяцев.
                                <br>
                                Общая стоимость желаний: {{ money( wish.sum ) }}
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

    data(){
        return {
            CostTable : class {
                constructor( tableState ) {
                    this.rows = tableState;
                    this.sum  = sumRowValues( tableState );
                }
            },
        };
    },

    computed: {
        incomeCash() {
            return new this.CostTable( this.getTableState('incomeCash') );
        },
        costCash() {
            return new this.CostTable( this.getTableState('costCash') );
        },
        wish() {
            return new this.CostTable( this.getTableState('wish') );
        },
        resultCost() {
            return this.incomeCash.sum - this.costCash.sum;
        },
        resultWish() {
            return {
                months : this.wish.sum / this.resultCost,
                years  : ~~ ( ( this.wish.sum / this.resultCost ) / 12 ),
            };
        }
    },

    methods: {
        getTableState( tableName ) {
            return [ ...this.$store.state[ tableName ] ];
        },
    }
};
</script>

<style scoped lang="less">
    // .container {
    //     margin: 20px;
    // }

    .card .button-card {
        bottom: 16px;
    }
</style>
