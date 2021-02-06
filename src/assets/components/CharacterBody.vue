<template>
    <v-row>
        <v-col
        v-for="item in items"
        :key="item.name"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        >
        <v-card>
            <v-card-title class="subheading font-weight-bold">
            {{ item.name }}
            </v-card-title>
            <v-img
            contain
            height="150"
            :src="getImage(item.name)"
        ></v-img>
            <v-divider></v-divider>

            <v-list dense>
            <v-list-item
                v-for="(key, index) in filteredKeys"
                :key="index"
            >
                <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                {{ key }}:
                </v-list-item-content>
                <v-list-item-content
                class="align-end"
                :class="{ 'blue--text': sortBy === key }"
                >
                {{ item[key.toLowerCase()] }}
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:['items'],
    computed:{
       
        filteredKeys () {
            return this.$store.getters.filteredKeys('Name')
        },
        sortBy(){
        return this.$store.state.sortBy
      },
    },
    methods:{
        getImage(name){
            var index = this.items.findIndex((e)=>e.name===name)
            return index!==-1 ? this.items[index].img : ''
        },
    }
}
</script>