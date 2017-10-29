<template>
    <v-card class="lighten-9 elevation-3 mb-4">

        <v-card-title primary-title>

            <h3 class="headline mb-0">{{ title }}</h3>

        </v-card-title>

        <v-card-text>

            <tableRow
                v-for="item in listRows"
                :itemLabel="item.label"
                :itemVal="item.val"
                :key="item._id"
                @saveCell="saveCell( item, $event )"
                @removeTableRow="removeTableRow( item )"
            ></tableRow>

            <tableRow
                v-if="isShowNewFields"
                key="newTableRow"
                @saveCell="addCell( $event )"
                @removeTableRow="hideNewFields"
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
                @click="showNewFields"
            >

                <v-icon>add</v-icon>

            </v-btn>

        </v-card-actions>

    </v-card>
</template>

<script>
import tableRow from '@/components/table-row/table-row.vue'
import { services } from '@/services';

export default {
    props : [ 'cardName', 'title', 'listRows' ],

    components: {
        tableRow,
    },

    data() {
        return {
            isShowNewFields : false,
        }
    },

    methods: {

        /**
        * Метод для сохранения.
        */
        async saveCell( item, data ) {
            await services[ this.cardName ]
                .update(
                    item._id,
                    { ...item, [ data.cellName ] : data.val }
                );
        },

        /**
        * Иницирует добавление новой строчки дохода/расхода
        */
        async addCell( data ) {
            this.hideNewFields();

            await services[ this.cardName ]
                .create( { [ data.cellName ] : data.val } );
        },
        showNewFields() {
            this.isShowNewFields = true;
        },
        hideNewFields() {
            this.isShowNewFields = false;
        },
        async removeTableRow( item ) {
            await services[ this.cardName ]
                .remove( item._id );
        },
    }
}
</script>

<style>

</style>
