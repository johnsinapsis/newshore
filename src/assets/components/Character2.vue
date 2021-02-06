import { push } from '../../../../../laragon/www/ferro/jsm/utils/TypedArrayUtils';
<template>
  <v-container>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
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

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
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

      <template v-slot:footer>
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
    </v-data-iterator>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    props:['house'],
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 3,
        sortBy: 'name',
        keys: [
          'Name',
          'LastName',
          'Species',
          'Gender',
          'DateOfBirth',
          'Ancestry',
          'EyeColour',
          'HairColour',
        ],
        items:[]
      }
    },
    watch:{
        /* characters:function(val){
            this.updateItems()
        } */
        house:function(val){
          this.loadCharacters()
        }
    },
    computed: {
      characters(){
        this.updateItems(this.$store.state.characters)
      },
      /* items(){
        return this.$store.state.items
      }, */
      numberOfPages () {
        const items = this.items
        console.log(items)
        return Math.ceil(items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
        updateItems: function(){
            this.items = []
            this.$store.state.characters.forEach(element => {
                var row = {
                    name: element.name,
                    lastname: this.getLastname(element.name),
                    species: element.species,
                    gender:  element.gender,
                    dateOfBirth: element.dateOfBirth,
                    ancestry: element.ancestry,
                    eyeColour: element.eyeColour,
                    hairColour: element.hairColour,
                    img: element.image,
                }
                this.items.push(row)
            });
            
        },
        getLastname: function(name){
            return name.split(" ")[1]
        },
        getImage(name){
            var index = this.items.findIndex((e)=>e.name===name)
            return index!==-1 ? this.items[index].img : ''
        },
        loadCharacters(){
          if(this.house==="Houseless"){
            this.$store.commit('updateCharacters')
            this.updateItems()
          }
          else{
            axios.get("http://hp-api.herokuapp.com/api/characters/house/"+this.house)
              .then((response) =>{
                this.$store.commit('setCharacters',response.data)
                this.updateItems()
              })
              .catch((error) => console.error(error))
          }
        }
    },
    created: function(){
      this.loadCharacters()
    },
    /* mounted: function(){
      this.updateItems()
    } */
  }
</script>