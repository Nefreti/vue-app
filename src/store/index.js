import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {}
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user
    },
  },

  actions: {
    getCurrentUser({commit}) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit('setCurrentUser', user)
        }
        console.log('user from store')
      })

    }
  }
})
