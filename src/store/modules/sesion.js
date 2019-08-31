
export default({
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
    cerrarSesion(context){
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
