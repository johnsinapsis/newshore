<template>
  <v-card
    class="mx-auto"
    max-width="300"
    
    tile
  >
    <v-list color="#a64b35" flat>
      <v-subheader><router-link to="/" class="text-decoration-none white--text">HOME</router-link></v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(house, i) in houses"
          :key="i"
        >
          
          <v-list-item-content>
            <router-link 
              :to="{name:'house',params:{house:house.length>0?house:'Houseless'}}" 
              class="text-decoration-none white--text"
              >
              <v-list-item-title 
                v-text="house.length>0?house:'Houseless'"
                >
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
  export default {
    
    data: () => ({
      selectedItem: 1,
    }),
    created(){
      
      this.$store.dispatch('getHousesAndHouseLess')
    },
    computed:{
      houses(){
        return this.$store.state.houses
      }
    }
  }
</script>