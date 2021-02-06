<template>
    <v-row>
        <v-col
            cols="12"
        >
            <div class="my-subtitle text-center">
                {{house}}
            </div>
        </v-col>
        <v-col
            cols="12"
        >
            <Character :house="house"></Character>
        </v-col>
    </v-row>
    
</template>
<script>
import axios from 'axios'
import Character from '../assets/components/Character2'
export default {
    props: ['house'],
    data: function(){
        return{
            characters:[],
            originalData:[]
        }
    },
    components:{
        Character
    },
    watch: {
        house: function(val){
            this.loadData(val)
        },
    },
    methods:{
        eventAlert: function(value){
            alert("Parece funcionar")
        },
        getHouseLess(){
            axios.get("http://hp-api.herokuapp.com/api/characters")
                .then((response) =>{
                    this.getEmptyHouse(response.data)
                })
                .catch((error) => console.error(error))
        },
        getEmptyHouse: function(data){
            this.characters = []
            data.forEach(element => {
                if(element.house==="")
                    this.characters.push(element)
            });
            console.log(this.characters);
        },
        getCharactersHouse: function(val){
            axios.get("http://hp-api.herokuapp.com/api/characters/house/"+val)
                .then((response) =>{
                    this.characters = response.data

                })
                .catch((error) => console.error(error))
        },
        
        loadData: function(val){
            if(val==="Houseless"){
                this.getHouseLess()
            }
            else{
                this.getCharactersHouse(val)
            }
        }
    },
    mounted: function(){
        
    }
}
</script>