<template>
  <div>
    <Anuncio/>
    <Cliente/>
    <Boletos/>
  </div>
</template>


<script>
  import Cliente from '@/components/Cliente.vue'
  import Anuncio from '@/components/Anuncio.vue'
  import Boletos from '@/components/Boletos.vue'
  export default {
    name: 'Entrada',
    components: { Cliente, Anuncio, Boletos }
  }
</script>
