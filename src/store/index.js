/*
* 状态管理
*/

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let state = {
}

let initState = JSON.parse(JSON.stringify(state))

let mutations = {
  RESETSTATE (state, data) {
    state = Object.assign({}, state, data)
  }
}

let action = {
  resetState ({commit}) {
    commit('RESETSTATE', initState)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  action
})

