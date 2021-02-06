<template v-slot:header>
        <v-toolbar
          dark
          color="#8c0000"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="#8c0000"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="#8c0000"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
</template>
<script>
export default {
    computed:{
      search:{
        get(){
          return this.$store.state.search
        },
        set(value){
          this.$store.commit('setSearch',value)
        }
      },
      sortBy:{
        get(){
          return this.$store.state.sortBy
        },
        set(value){
          this.$store.commit('setSortBy',value)
        }
      },
      sortDesc:{
        get(){
          return this.$store.state.sortDesc
        },
        set(){
          this.$store.commit('changeSortDesc')
        }
      },
      keys(){
        return this.$store.state.keys
      }
    }
}
</script>