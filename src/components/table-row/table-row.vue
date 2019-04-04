<template>
    <v-layout row class="input-item" v-bind="binding">

        <v-flex xs12 md5-and-up>

            <cell
                class="item-layout"
                addClass="label-name"
                cellName="title"
                placeholder="Введите название"
                @saveCell="saveCell( $event )"
                @blur="blurHandler"
                :cellValue="itemTitle"
                :isFocus="!itemTitle"
            ></cell>

        </v-flex>

        <v-flex xs12 md5-and-up>

            <cell
                class="item-layout"
                addClass="label"
                cellName="amount"
                placeholder="Введите сумму"
                @saveCell="saveCell( $event )"
                @blur="blurHandler"
                :cellValue="itemAmount"
                :isFocus="!!itemTitle && !itemAmount"
            ></cell>

        </v-flex>


        <v-flex xs1 offset-xs1 text-xs-center>

            <v-btn
                icon
                class="remove-button grey--text"
                @click="$emit( 'deleteTableRow' )"
            >
                <v-icon class="cancel-icon">cancel</v-icon>
            </v-btn>

        </v-flex>

    </v-layout>
</template>

<script>
import cell from './cell'

export default {
    props: [ 'itemAmount', 'itemTitle' ],

    components: {
        cell,
    },

    methods : {
        saveCell( data ) {
            this.$emit( 'saveCell', data );
        },
        blurHandler() {
            if ( !this.itemTitle && !this.itemAmount ) {
               this.$emit( 'deleteTableRow' );
            }
        },
    },

    computed: {
        binding () {
          const binding = {};

          if ( this.$vuetify.breakpoint.smAndDown ) {
              binding.column = true;
          }

          return binding;
        },
    },
};
</script>

<style scoped lang="less">
.input-item {
    border-bottom: 1px solid #ccc;
    margin: 6px 0;

    &:hover {
        .remove-button {
            display: block;
        }
    }
}

.remove-button {
    display: none;
    width: 20px;
    height: 20px;
    margin: 0;
    border-radius: 50%;

    &:hover {
        cursor: pointer;
        background-color: #dbedff;
    }
}

.cancel-icon {
    font-size: 16px;
}
</style>
