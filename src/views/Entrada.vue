<template>
  <div>
    <Anuncio/>
    <Cliente/>
    <Email/>
    <Boletos/>
    <Firma/>
  </div>
</template>


<script>
  import Cliente from '@/components/Cliente.vue'
  import Anuncio from '@/components/Anuncio.vue'
  import Boletos from '@/components/Boletos.vue'
  import Firma from '@/components/Firma.vue'
  import Email from '@/components/Email.vue'
  export default {
    name: 'Entrada',
    components: { Cliente, Anuncio, Boletos, Firma, Email }
  }
</script>
