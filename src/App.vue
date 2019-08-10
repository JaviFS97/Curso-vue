<template>
  <div id="app" class="principal">
    <span>App</span>

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
  
</style>