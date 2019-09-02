import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/usuario/Login.vue'
import Registro from './views/usuario/Registro.vue'
import Perfil from './views/usuario/Perfil.vue'
import Obra from './views/teatro/Obra.vue'
import Presentacion from './views/teatro/Presentacion.vue'
import NotFound from './views/NotFound.vue'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sesion/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sesion/registro',
      name: 'registro',
      component: Registro
    },
    {
      path: '/usuario/perfil',
      name: 'perfil',
      component: Perfil,
      meta: {
        autenticado: true
      }
      // beforeEnter: (to, from, next) => {
      //   // Debemos importar store porque en 'router.js' no tenemos una instancia de vue.
      //     if(store.state.sesion.usuario)
      //         next()
      //     else
      //         next({name:'login'})
      // }

    },
    {
      path: '/obras/:oid',
      name: 'obra',
      component: Obra
    },
    {
      path: '/:oid/:tid/:fecha',
      name: 'presentacion',
      component: Presentacion
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    // Si tras haber recorrido todas las rutas ninguna ha coincidido, se mostrará esta.
    {
      path: '*',
      component: NotFound
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some( record => record.meta.autenticado)){
    // Debemos importar store porque en 'router.js' no tenemos una instancia de vue.
    if(store.state.sesion.usuario)
        next()
    else
        next({name:'login'})
  }else{
    next()
  }
})

export default router