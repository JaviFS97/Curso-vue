<template>
  <v-app>
    <v-navigation-drawer v-model="menu" app>
      <v-list>
        <!-- Home -->
        <v-list-item :to="{ path: '/'}">
          <v-list-item-avatar>
            <v-icon>home</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Perfil -->
        <v-list-item v-if="usuario" :to="{ name: 'perfil', params: { userName: usuario.userName}}"> 
          <v-list-item-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Registro -->
        <v-list-item v-if="!usuario" :to="{ name: 'registro'}">
          <v-list-item-avatar>
            <v-icon>contact_mail</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Registro</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Ingresar -->
        <v-list-item v-if="!usuario" :to="{ name: 'login'}">
          <v-list-item-avatar>
            <v-icon>arrow_forward</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Ingresar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Cerrar sesion -->
        <v-list-item v-if="usuario" @click="cerrarSesion">
          <v-list-item-avatar>
            <v-icon>arrow_back</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>

    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>
      <v-toolbar-title  @click="$router.push({name:'home'})" class="logo">
        <span> {{this.titulo}} </span>
      </v-toolbar-title> 
      <v-spacer></v-spacer>     
      <router-link v-if="usuario!=null" :to="{name:'perfil', params: { userName: usuario.userName}}" id="cajaPerfil">
        <span> {{ usuario.nombre}} </span>
      </router-link>
      
    </v-app-bar>



    <v-content>
      <v-container fill-height>
        <v-slide-y-transition mode="out-in">          
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-snackbar v-model="notificacion.visible" :color="notificacion.color" :timeout="notificacion.duracion" top>
      {{notificacion.mensaje}}
      
      <v-btn dark text @click="ocultarNotificacion">
        Cerrar
      </v-btn>


    </v-snackbar>

    <v-dialog v-model="ocupado.visible" max-width="400" persistent>
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            {{ocupado.titulo}}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">
          {{ocupado.mensaje}}
        </v-card-text>
          <v-progress-linear indeterminate color="primary"></v-progress-linear>
        <v-card-text>

        </v-card-text>
      </v-card>
    </v-dialog>

    <v-footer color="primary" dark="">
      <v-container>
        <v-row justify="center"> 
          <span> Curso Vue.js y Firebase</span>

        </v-row>
        <v-row justify="center">
          <span>2019</span>
        </v-row>
          
      </v-container>
      
    </v-footer>

  </v-app>
</template>

<script>
  //import Home from './views/Home.vue'
  // import Registro from './views/usuario/Registro.vue'
  // import Login from './views/usuario/Login.vue'
  // import Perfil from './views/usuario/Perfil.vue'
  // import Home from './views/Home.vue'

  export default {
    //components : {Registro, Login, Perfil, Home},
    name: 'App',
    data: () => ({
      titulo : 'Super Opera',
      menu: false
    }),
    methods: {
      ocultarNotificacion(){
        this.$store.commit('ocultarNotificacion')
      },
      cerrarSesion(){
        this.$store.dispatch('sesion/cerrarSesion')
        this.menu = false

        this.$router.push({name:'login'})
      }
    },
    computed: {
      usuario(){
        return this.$store.state.sesion.usuario
      },
      notificacion(){
        return this.$store.state.notificacion
      },
      ocupado(){
        return this.$store.state.ocupado
      }
    }

  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Great+Vibes&display=swap');

  .logo{
    font-family: 'Great Vibes', cursive;
    font-size: 2rem;
    cursor: pointer;

  }

  #cajaPerfil{
    color: white;
    text-decoration: none;

  }
</style> 