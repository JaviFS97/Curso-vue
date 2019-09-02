import Vue from 'vue'
import Vuex from 'vuex'

// Importo los modulos
import sesion from './modules/sesion.js'
import teatro from './modules/teatro.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sesion,
    teatro
  },
  state: {
    notificacion: {
      visible: false,
      mensaje: '',
      color: '',
      duracion: 0
    },
    ocupado: {
      visible: false,
      titulo: '',
      mensaje: ''

    }
  },
  mutations: {
    mostrarNotificacionInformacion(state, mensaje, duracion){
      state.notificacion.color = 'info'
      state.notificacion.mensaje = mensaje
      state.notificacion.duracion = duracion
      state.notificacion.visible = true
    },
    mostrarNotificacionExito(state, mensaje, duracion){
      state.notificacion.color = 'success'
      state.notificacion.mensaje = mensaje
      state.notificacion.duracion = duracion
      state.notificacion.visible = true
    },
    mostrarNotificacionAdvertencia(state, mensaje, duracion){
      state.notificacion.color = 'warning'
      state.notificacion.mensaje = mensaje
      state.notificacion.duracion = duracion
      state.notificacion.visible = true
    },
    mostrarNotificacionError(state, mensaje, duracion){
      state.notificacion.color = 'error'
      state.notificacion.mensaje = mensaje
      state.notificacion.duracion = duracion
      state.notificacion.visible = true
    },
    ocultarNotificacion(state){
      state.notificacion.visible = false
    },

    mostrarOcupado(state, ocupado){
      state.ocupado.titulo = ocupado.titulo
      state.ocupado.mensaje = ocupado.mensaje
      state.ocupado.visible = true

    },
    ocultarOcupado(state){
      state.ocupado.visible = false
    }
  },
  actions: {

  },
  getters: {

  }
})
