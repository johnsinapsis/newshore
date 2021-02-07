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
        <CharacterHead></CharacterHead>
      </template>

      <template v-slot:default="props">
        <CharacterBody :items="props.items"></CharacterBody>
      </template>

      <template v-slot:footer>
        <CharacterFooter></CharacterFooter>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
  import CharacterHead from './CharacterHead'
  import CharacterBody from './CharacterBody'
  import CharacterFooter from './CharacterFooter'
  import axios from 'axios'
  export default {
    props:['house'],
    data () {
      return {
        filter: {},
       
      }
    },
    components:{
      CharacterHead,
      CharacterBody,
      CharacterFooter
      },
    watch:{
        house:function(val){
          this.loadCharacters()
        }
    },
    computed: {
      items(){
        return this.$store.state.items
      },
      page:{
          get(){
            return this.$store.state.page
          },
          set(value){
            this.$store.commit('setPage',value)
          }
        },
      itemsPerPageArray(){
        return this.$store.state.itemsPerPageArray
      },
      itemsPerPage:{
        get(){
          return this.$store.state.itemsPerPage
        },
        set(value){
          this.$store.commit('setItemsPerPage',value)
        }
      },
      search(){
        return this.$store.state.search
      },
      sortDesc(){
        return this.$store.state.sortDesc
      },
      sortBy(){
        return this.$store.state.sortBy
      },
     
      keys(){
        return this.$store.state.keys
      }
    },
    methods: {
      
        updateItems: function(){
            var items = []
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
                items.push(row)
            });
            this.$store.commit('setItems',items)
            
        },
        getLastname: function(name){
            return name.split(" ")[1]
        },
       
        loadCharacters(){
          if(this.house==="Houseless"){
            this.$store.commit('updateCharacters')
            this.updateItems()
          }
          else{
            this.$store.dispatch('getCharacters',this.house)
              .then(()=>{
                this.updateItems()
              })
          }
        }
    },
    created: function(){
      this.loadCharacters()
      this.$store.commit('setPage',1)
      this.$store.commit('setItemsPerPage',3)
      this.$store.commit('setItemsPerPageArray',[3,6,9])
      this.$store.commit('setSortBy','name')
      this.$store.commit('setKeys',[
        'Name',
        'LastName',
        'Species',
        'Gender',
        'DateOfBirth',
        'Ancestry',
        'EyeColour',
        'HairColour'
      ])
    },
    
  }
</script>