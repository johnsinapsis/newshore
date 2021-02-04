import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './scss/variables.scss'

Vue.use(VueRouter)
Vue.use(Vuetify)

//const Home = { template: '<div>Hola soy vista Home</div>' }
//const House = { template: '<div>Vista House</div>' }

import Home from './views/Home.vue'
import House from './views/House.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/house/:house', component: House, name:'house', props:true },

]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
})
