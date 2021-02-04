<template>
  <v-card
    
    
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="img"
    >
    </v-img>

    <div class="my-subtitle text-center" style="background-color:#a64b35">
        Welcome to Hogwarts
    </div>


    
  </v-card>
</template>
<script>
  import img from '../assets/img/picture1.jpg'
  export default {
    data: function(){
      return{
        img
      }
    }
  }
</script>