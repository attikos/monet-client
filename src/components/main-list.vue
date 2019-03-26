<template>
    <div>
        <md-list class="md-dense">
            <md-list-item v-for="( item, i ) in list" :key="i" >
                <span>{{ item.name + ': ' + item.amount }}</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {
    props: [ 'list' ],
}
</script>
