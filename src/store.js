import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginIn: false,
    loginError: null,
    loginSuccessful: false
  },
  mutations: {
    loginStart: state => state.loginIn = true,
    loginStop: (state, errMessage) => {
      state.loginIn = false,
        state.loginError = errMessage,
        state.loginSuccessful = !errMessage
    }
  },
  actions: {
    doLogin({
      commit
    }, loginData) {
      commit('loginStart');

      axios.post('https://reqres.in/api/login', {
          ...loginData
        })
        .then(() => {
          commit('loginStop', null)
        })
        .catch(err => {
          commit('loginStop', err.response.data.error)
        })
    }
  }
})