import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Se crea y asocia a esta variable desde la vista login.
    usuario: null
  },
  mutations: {
    actualizarUsuario(state, usuario){
      state.usuario = usuario
    }
  },
  actions: {

  },
  getters: {

  }
})
