<template>
  <div>
    <Anuncio/>
    <Cliente v-bind:emailRecibidoDesdeEntrada="email"/>
    <Email v-bind:emailRecibidoDesdeEntrada="email" @onCambioEmail="actualizandoEmail"/>
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
    components: { Cliente, Anuncio, Boletos, Firma, Email },
    data() {
      return {
        email: 'isaacNewton@email.com'
      }
    },
    methods: {
      actualizandoEmail(email){
        this.email = email
      }
    }
  }
</script>
