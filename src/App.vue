<template>
  <div id="app" class="principal">
    <span> {{ titulo }} </span>
    <Entrada/>
  </div>
</template>


<script>
  import Entrada from '@/views/Entrada.vue'
  export default {
    name: 'App',
    components: { Entrada },
    data() {
      return {
        titulo: 'Entradas'
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
  
</style>