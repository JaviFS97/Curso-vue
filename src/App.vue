<template>
  <div id="app" class="principal">
    <span> {{ titulo }} </span>    
    <div>
        <button @click="componenteActual = item.componente" v-for="(item, index ) in menu" :key="index"  class="menu">{{item.nombre}}</button>
    </div>
    <component :is="componenteActual"></component>
    
  </div>
</template>


<script>
  import Entrada from '@/views/Entrada.vue'
  import Home from '@/views/Home.vue'
  import Login from '@/views/usuario/Login.vue'
  import Perfil from '@/views/usuario/Perfil.vue'
  import Registro from '@/views/usuario/Registro.vue'
  export default {
    name: 'App',
    components: { Entrada, Home, Login, Perfil, Registro },
    data() {
      return {
        titulo: 'Entradas',
        componenteActual: 'Entrada',
        menu: [
          {nombre: 'Home', componente: 'Home'},
          {nombre: 'Entradas', componente: 'Entrada'},
          {nombre: 'Perfil', componente: 'Perfil'},
          {nombre: 'Login', componente: 'Login'},
          {nombre: 'Registro', componente: 'Registro'}

          
        ]
      }
    }
    
  }
</script>

<!-- Si ponemos <style scoped> => forzamos que el estilo sea privado para este componente -->
<style>

  .principal{
    background-color: rgb(182, 18, 18);
    padding: 10px;
    color: white;
    border-radius: 5px;
    width: 400px;
    text-align: center;
    font-size: 2rem;
  }

  .seccion{
    font-size: 1.5rem;
    color: rgb(24, 23, 23);
    background-color: azure;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
  }

  .menu {
    color: white;
    background-color: transparent;
    font-weight: normal;
    font-size: 1rem;
    margin: 3px 2px;
  }

  button {
    background-color: #553f75;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    border-style: none;
    border-radius: 5px;
    padding: 3px 10px;
    margin: 3px 5px;
    min-width: 35px;  
    cursor: pointer;
  }
</style>