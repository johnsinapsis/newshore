<template>
    <v-row
        class="mt-2"
        align="center"
        justify="center"
    >
        <span class="grey--text">Items per page</span>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            dark
            text
            color="#8c0000"
            class="ml-2"
            v-bind="attrs"
            v-on="on"
            >
            {{ itemsPerPage }}
            <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
            v-for="(number, index) in itemsPerPageArray"
            :key="index"
            @click="updateItemsPerPage(number)"
            >
            <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span
        class="mr-4
        grey--text"
        >
        Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-row justify="center" class="btn-mt">
            <v-btn
            fab
            dark
            color="#8c0000"
            class="mr-1"
            @click="formerPage"
        >
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            color="#8c0000"
            class="ml-1"
            @click="nextPage"
        >
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        </v-row>
        
    </v-row>
</template>
<script>
export default {
    computed:{
        items(){
            return this.$store.state.items
        },
        itemsPerPageArray(){
            return this.$store.state.itemsPerPageArray
        },
        itemsPerPage(){
            return this.$store.state.itemsPerPage
        },
        page(){
            return this.$store.state.page
        },
        numberOfPages () {
            const items = this.$store.state.items
            return Math.ceil(items.length / this.$store.state.itemsPerPage)
        },
    },
    methods:{
        updateItemsPerPage (number) {
            this.$store.commit('setItemsPerPage',number)
        },
        formerPage () {
            if (this.page - 1 >= 1){
                const newPage = this.page - 1
                this.$store.commit('setPage',newPage)
            } 
        },
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) {
                const newPage = this.page + 1
                this.$store.commit('setPage',newPage)
            }
        },
    }
}
</script>