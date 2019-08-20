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

  export default {
    components : {Registro, Login},
    name: 'App',
    data: () => ({
      componenteActual: 'Login',
      titulo : 'Super Opera',
    }),
  };
</script>
