import Vue from 'vue'
import Vuex from 'vuex'

import {login} from './api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
     async login({commit},username){
     const r = await login();
      console.log(r)
    }
  }
})
