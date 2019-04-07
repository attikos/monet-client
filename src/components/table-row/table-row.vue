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
                :cellValue="+itemAmount"
                :isFocus="!!itemTitle && !itemAmount"
            ></cell>

        </v-flex>


        <v-flex xs12 md2 0offset-xs1 text-xs-center>
            <v-layout >

                <v-flex >
                    <v-btn
                        icon
                        class="control-button grey--text"
                        @click="$emit('openSettings')"
                    >
                        <v-icon class="icon-settings">settings</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex >

                    <v-btn
                        icon
                        class="control-button grey--text"
                        @click="$emit('deleteTableRow')"
                    >
                        <v-icon class="icon-cancel">cancel</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
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
        .control-button {
            opacity: 1;
        }
    }
}

.control-button {
    opacity: 0;
    width: 20px;
    height: 20px;
    margin: 0;
    border-radius: 50%;

    &:hover {
        cursor: pointer;
        background-color: #dbedff;
    }
}
</style>
