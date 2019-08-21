<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title class="headline text-uppercase">
        <span> {{this.titulo}} </span>
        <span class="font-weight-light"></span>
      </v-toolbar-title>

    </v-app-bar>

    <v-content>
      <v-container fill-height>
        <component :is="this.componenteActual"></component>
      </v-container>
    </v-content>
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
    }),
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Great+Vibes&display=swap');
</style> 