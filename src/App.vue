<template>
  <div id="app">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <v-row align-content="center">
            <v-col
              cols="12"
              md="3"
              sm="6"
              align-self="center"
            >
              <div class="text-center">
                <img :src="logo" alt="" class="logo">
              </div>
            </v-col>
            <v-col
              align-self="center"
            >
              <div class="text-center my-title">
                {{msg}}
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col 
              cols="12"
              md="3"
            > 
              <HouseList :houses="houses"></HouseList>
            </v-col>
            <v-col
              xs="6" 
              sm="4" 
              md="9"
            >
              <div>
              <router-view></router-view>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-row></v-row>
      </v-main>
    </v-app> 
  </div>
</template>

<script>
import HouseList from './assets/components/HouseList'
import logo from './assets/img/Hogwartscrest.png'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Magician School Education',
      logo,
      houses:[],
    }
  },
  components:{
    HouseList
  },
  methods:{
    getDataApi: function(){
      axios.get("http://hp-api.herokuapp.com/api/characters")
        .then((response) =>{
          //console.log(response.data)
          this.getHouses(response.data)
        })
        .catch((error) => console.error(error))
    },
    getHouses: function(data){
      var index;
      data.forEach(element => {
        index = this.houses.findIndex((e) => e === element.house)
        if(index===-1)
          this.houses.push(element.house)
      });
    }
  },
  mounted: function(){
    this.getDataApi()
  }
}
</script>

<style lang="scss">


</style>
