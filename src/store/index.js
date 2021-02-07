import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        houses:[],
        characters:[],
        houseless:[],
        sortBy:'',
        sortDesc:false,
        search: '',
        keys:[],
        itemsPerPage:0,
        itemsPerPageArray:[],
        page:1,
        items:[]
    },
    getters:{
        filteredKeys: (state) => (keyToFilter) =>{
            return state.keys.filter(key => key !== keyToFilter)
        }
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
        setSortBy(state,key){
            state.sortBy = key
        },
        changeSortDesc(state){
            state.sortDesc = !state.sortDesc
        },
        setSearch(state,data){
            state.search = data
        },
        setKeys(state,data){
            state.keys = data
        },
        setItemsPerPage(state,data){
            state.itemsPerPage = data
        },
        setItemsPerPageArray(state,data){
            state.itemsPerPageArray = data
        },
        setPage(state,data){
            state.page = data
        },
        setItems(state,data){
            state.items = data
        }
        
    },
    actions:{
        getHousesAndHouseLess({commit}){
            axios.get("http://hp-api.herokuapp.com/api/characters")
                .then((response) =>{
                    commit('setHouses',response.data)
                })
                .catch((error) => console.error(error))
        },
        getCharacters({commit},house){
            return new Promise((resolve)=>{
                console.log(house)
                axios.get("http://hp-api.herokuapp.com/api/characters/house/"+house)
                .then((response) =>{
                        commit('setCharacters',response.data)
                        resolve()
                    })
                    .catch((error) => console.error(error))

            })
                //this.updateItems()
        }
    },
    modules:{}
})