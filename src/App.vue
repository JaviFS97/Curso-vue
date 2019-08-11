<template>
  <div id="app" class="principal">
    <span> {{ titulo }} </span>
    <Anuncio/>
    <Cliente/>
  </div>
</template>


<script>
  import Cliente from '@/components/Cliente.vue'
  import Anuncio from '@/components/Anuncio.vue'
  export default {
    name: 'App',
    components: { Cliente, Anuncio},
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