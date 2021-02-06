import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        houses:[],
        characters:[],
        houseless:[],
        items:[]
    },
    mutations:{
        setHouses(state,data){
            data.forEach(element => {
                if(state.houses.findIndex((e)=> e === element.house) === -1)
                    state.houses.push(element.house)
                if(element.house==="")
                    state.houseless.push(element)
            });
        },
        setCharacters(state,data){
            state.characters = data
        },
        updateCharacters(state){
            state.characters = state.houseless
        },
        setItems(state){
            state.characters.forEach(element => {
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
                state.items.push(row)
            });
        }
        
    },
    actions:{},
    modules:{}
})