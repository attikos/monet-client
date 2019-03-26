<template>
    <v-layout row>
        <v-flex xs10>

            <div
                v-if="!isEditing"
                :class="[
                    addClass,
                    { 'cell-highlight' : !value }
                ]"
                @click="isEditing = true"
            >

                {{ cellText || placeholder }}

            </div>

            <input
                v-if="isEditing"
                class="input"
                type="text"
                :placeholder="placeholder"
                v-model.trim.number="value"
                @keyup.enter="saveCell( $event )"
                @keyup.esc="cancel"
                @focus="oldVal = value"
                @blur="saveCell( $event )"
                v-focus
            ></input>

        </v-flex>

        <v-flex xs1>

            <v-btn
                v-if="isEditing"
                icon
                class="button button-save deep-orange--text"
                @click="saveCell"
            >
                <v-icon class="icon">save</v-icon>
            </v-btn>

            <v-btn
                v-if="!isEditing"
                icon
                class="button deep-orange--text"
                @click="isEditing = true"
            >
                <v-icon class="icon">edit</v-icon>
            </v-btn>

        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props : [ 'cellName', 'placeholder', 'cellValue', 'addClass', ],

    data() {
        return {
            value     : this.cellValue,
            oldVal    : '',
            isEditing : false,
        }
    },

    computed: {
        cellText() {
            if ( !this.value ) {
                return 0;
            }

            return this.cellName === 'amount' ? this.money( this.value ) : this.value;
        },
    },

    methods : {
        saveCell( $event ) {

            if ( !this.isEditing || this.value === this.oldVal ) {
                this.isEditing = false;

                return;
            }

            this.$emit( 'saveCell', { cellName : this.cellName, val : this.value } );
            this.isEditing = false;
            this.value     = this.cellValue;
        },
        cancel() {
            this.isEditing = false;
            this.value     = this.oldVal;
        }
    },

    watch : {
        cellValue() {
            this.value = this.cellValue;
        }
    }
}
</script>

<style scoped lang="less">

.input {
    display: inline-block;
    padding: 0 2px;
    font-size: 16px;
    width: 100%;
    max-width: 100%;
    background-color: lightyellow;
}

.label {
    display: block;
    font-size: 16px;
    padding: 0 2px;
    height: 24px;
    border-radius: 3px;

    &:hover {
        background-color: #dbedff;
        cursor: pointer;
    }
}

.label-name {
    .label;

    color: #777
}

.cell-highlight {
    color: #cccccc;
    background-color: #fff4f4;
    white-space: nowrap;
    overflow: hidden;
}

.input-item .item-layout {
    &:hover {
        .button {
            display: block;
        }
    }
}

.button {
    display: none;
    width: 20px;
    height: 20px;
    margin: 0;

    &:hover {
        cursor: pointer;
        border-radius: 50%;
        background-color: #dbedff;
    }
}

.button-save {
    display: block;
}

.icon {
    font-size: 16px;
}
</style>
