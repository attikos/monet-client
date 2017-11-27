<template>
    <v-layout row class="input-item" v-bind="binding">

        <v-flex xs12 md5-and-up>

            <cell
                class="item-layout"
                addClass="label-name"
                cellName="label"
                placeholder="Введите название"
                @saveCell="saveCell( $event )"
                :cellValue="itemLabel"
            ></cell>

        </v-flex>

        <v-flex xs12 md5-and-up>

            <cell
                class="item-layout"
                addClass="label"
                cellName="val"
                placeholder="Введите сумму"
                @saveCell="saveCell( $event )"
                :cellValue="itemVal"
            ></cell>

        </v-flex>


        <v-flex xs1 offset-xs1 text-xs-center>

            <v-btn
                icon
                class="remove-button grey--text"
                @click="$emit( 'removeTableRow' )"
            >
                <v-icon class="cancel-icon">cancel</v-icon>
            </v-btn>

        </v-flex>

    </v-layout>
</template>

<script>
import cell from './cell'

export default {
    props: [ 'itemVal', 'itemLabel' ],

    components: {
        cell,
    },

    methods : {
        saveCell( data ) {
            this.$emit( 'saveCell', data );
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
    // display: flex;
    // height: 24px;
    border-bottom: 1px solid #ccc;
    margin: 6px 0;

    &:hover {
        .remove-button {
            display: block;
        }
    }
}

// .input-item .item-layout {
    // max-width: 50%;
    // flex: 1 1 50%;
// }

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
