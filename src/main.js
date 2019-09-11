import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'
import store from './store'
import router from './router'
import {auth} from './firebase'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)

/**
 * Si se crea una nueva sesion de usuario, se crea un objeto sesion
 * que queda almacenado en el navegador. (F12, pestaña Application, IndexDB).
 * Cada vez que cambia esto, se llama a iniciar sesion o cerrar sesion.
 * Cerrar sesion elimina la sesion del navegador.
 */
auth.onAuthStateChanged( user => {
    // Si user no es nulo es porque inicio sesion.
    if(user){
      store.dispatch('sesion/iniciarSesion', user.uid)
    }else{
      store.dispatch('sesion/cerrarSesion')
    }
});


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
