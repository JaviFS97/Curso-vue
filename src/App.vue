<template>
  <v-app>
    <v-navigation-drawer v-model="menu" app>
      <v-list>
        <!-- Home -->
        <v-list-item @click="seleccionarVista('Home')">
          <v-list-item-avatar>
            <v-icon>home</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Perfil -->
        <v-list-item @click="seleccionarVista('Perfil')"> 
          <v-list-item-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Registro -->
        <v-list-item @click="seleccionarVista('Registro')">
          <v-list-item-avatar>
            <v-icon>contact_mail</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Registro</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Ingresar -->
        <v-list-item @click="seleccionarVista('Login')">
          <v-list-item-avatar>
            <v-icon>arrow_forward</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Ingresar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>

    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>
      <v-toolbar-title @click="seleccionarVista('Home')" class="logo">
        <span > {{this.titulo}} </span>
      </v-toolbar-title> 
      <v-spacer></v-spacer>     
      <span v-if="usuario!=null"> {{ usuario.nombre}} </span>
    </v-app-bar>



    <v-content>
      <v-container fill-height>
        <v-slide-y-transition mode="out-in">
          <component :is="this.componenteActual"></component>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-snackbar v-model="notificacion.visible" :color="notificacion.color" :timeout="notificacion.duracion" top>
      {{notificacion.mensaje}}
      
      <v-btn dark text @click="ocultarNotificacion">
        Cerrar
      </v-btn>


    </v-snackbar>

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
  import Registro from './views/usuario/Registro.vue'
  import Login from './views/usuario/Login.vue'
  import Perfil from './views/usuario/Perfil.vue'
  import Home from './views/Home.vue'

  export default {
    components : {Registro, Login, Perfil, Home},
    name: 'App',
    data: () => ({
      componenteActual: 'Home',
      titulo : 'Super Opera',
      menu: false
    }),
    methods: {
      seleccionarVista (nombreVista) {
        this.componenteActual = nombreVista
        // Una vez seleccionado la vista, cerrar el menu.
        this.menu = false
      },
      ocultarNotificacion(){
        this.$store.commit('ocultarNotificacion')
      }
    },
    computed: {
      usuario(){
        return this.$store.state.usuario
      },
      notificacion(){
        return this.$store.state.notificacion
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
</style> 