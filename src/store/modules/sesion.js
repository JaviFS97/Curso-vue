import {auth} from '@/firebase'


export default({
  namespaced: true,
  state: {
    // Se crea y asocia a esta variable desde la vista login.
    usuario: null
  },
  mutations: {
    actualizarUsuario(state, usuario){
      state.usuario = usuario
    },
  },
  actions: {
    iniciarSesion(context, uid){
      // Creamos un usuario
      let usuario = {
        uid,
        userName: 'newton',
        nombre: 'Isaac',
        apellidos: 'Newton',
        sexo: 'F',
        descripcion: 'añadir descripcion',
        biografia: 'https://es.wikipedia.org/wiki/Isaac_Newton',
        fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg'
      }

      context.commit("actualizarUsuario", usuario)

    },
    cerrarSesion(context){
      // Eliminamos el token del navegador.
      auth.signOut()
      // Colocamos a null el usuario.
      context.commit('actualizarUsuario', null)
    }
  },
  getters: {
    saludo(state){
      if(!state.usuario){
        return 
      }else{
        let vocal = state.usuario.sexo && state.usuario.sexo == "M" ? 'o':'a'
        return '¡Bienvenid' + vocal + ' ' + state.usuario.nombre + '!' 
      }
    }
  }
})
