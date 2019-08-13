<template>
  <div class="seccion">
    <div>
      <!-- Expresion js 
      <span> {{ nombres + " " + apellidos }}</span>
      -->
      <span> {{ nombreCompleto }}</span>
    </div>

    <!-- Se puede colocar v-bind:src= o :src= , representa lo mismo. -->
    <div>
      <img v-bind:src="fotoPerfil" alt="">
    </div>
    <div>
      <a :href="bibliografia" >Bibliografia</a>
    </div>

    <div>
      <span>Edad: {{ edad }}</span>
    </div>
  </div>

</template>


<script>
  export default {
    name: 'Cliente', 

    data() {
      return {
        nombres: 'Isaac',
        apellidos: 'Newton',
        fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/220px-Sir_Isaac_Newton_%281643-1727%29.jpg',
        bibliografia: 'https://es.wikipedia.org/wiki/Isaac_Newton',
        fechaNacimiento : new Date(1642, 11, 25)
      }
    },

    /**
     * La propiedad computed sirve para no añadir expresiones complejas js al render declarativo
     * del codigo html.
     * Es decir, se crean funciones js que contengan dichas expresiones para solo tener que llamar
     * desde el render declarativo al nombre de la funcion alojada en la propiedad computed.
     * 
     * ¿En que se diferencian las funciones computed de methods?
     * La diferencia es que "computed properties are cached based on their reactive dependencies",
     * esto significa que mientras que la fecha de nacimiento no cambie, no se volvera a evaluar
     * la funcion sino que se devuelve un valor de cache.
     * Computed esta orientado a funciones que tienen que ver con los datos (data) del componente.  
     * 
     */
    computed: {
      // nombreCompleto: function () { ==  nombreCompleto() {
      nombreCompleto() {
        return this.nombres + " " + this.apellidos
      },

      edad() {
        return this.calcularEdad(this.fechaNacimiento)
      }
    },

    methods: {
      calcularEdad(fecha){
        let fechaActual = new Date()
        return Math.floor((fechaActual - fecha ) / ( 1000 * 365.25 * 24 * 60 * 60))
      }
    }

  }
</script>


<style>

</style>