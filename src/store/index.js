import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        houses:[],
        characters:[],
        houseless:[],
        
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
        
        
    },
    actions:{},
    modules:{}
})