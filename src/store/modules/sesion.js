import {auth, db} from '@/firebase'
import router from '@/router'

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
    actualizarNombreYApellidos(state, payload){
      if(state.usuario){
        state.usuario.nombre = payload.nombre
        state.usuario.apellidos = payload.apellidos
      }
    }
  },
  actions: {
    async iniciarSesion(context, uid){
      try{
        let doc = await db.collection('usuarios').doc(uid).get()
        if(doc.exists){
          let usuario = doc.data()
          context.commit("actualizarUsuario", usuario)
        }else{
          // Si no existe un documento con dicha uid, le enviamos al registro.
          router.push( {name: 'registro'})
        }

      }catch(error){
        // {root: true} sirve para indicar que esta funcion se encuentra en el padre.
        context.commit('mostrarError', 'Ocurrió un error al consultar la informacion del usuario', {root: true})
      }


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
