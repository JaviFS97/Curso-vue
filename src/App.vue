<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title class="headline text-uppercase">
        <span> {{this.titulo}} </span>
        <span class="font-weight-light"></span>
      </v-toolbar-title>

    </v-app-bar>

    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
  import Home from './views/Home.vue'
  export default {
    components : {Home},
    name: 'App',
    data: () => ({
      titulo : 'Super Opera',
    }),
  };
</script>
