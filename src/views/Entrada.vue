<template>
  <div class="seccion-entrada">
    <span>Entrada</span>
    <Cliente/>
  </div>
</template>


<script>
  import Cliente from '@/components/Cliente.vue'

  export default {
    components: { Cliente }
  }
</script>


<style>

  .seccion-entrada{
    margin: 10px;
    padding: 10px;
    background-color: #553f75;
    border-radius: 10px;
    font-size: 1.5rem;
  }
  
</style>