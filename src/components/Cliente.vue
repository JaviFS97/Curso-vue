<template>
  <div class="seccion-cliente">
    <div>
      <!-- Expresion js 
      <span> {{ nombres + " " + apellidos }}</span>
      -->
      <span> {{ nombreCompleto }}</span>
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
        nombres: 'Bob',
        apellidos: 'Willson',
        fechaNacimiento : new Date(1987, 7, 10)
      }
    },

    /**
     * La propiedad computed sirve para no añadir expresiones complejas js al render declarativo
     * del codigo html.
     * Es decir, se crean funciones js que contengan dichas expresiones para solo tener que llamar
     * desde el render declarativo al nombre de la funcion alojada en la propiedad computed.
     */
    computed: {
      // nombreCompleto: function () { ==  nombreCompleto() {
      nombreCompleto() {
        return this.nombres + " " + this.apellidos
      },
      
      /**
       * En la base de datos no se guarda una edad, se guarda una fecha de nacimiento y de ahi
       * se calcula la edad.
       */
      edad() {
        let fechaActual = new Date()
        return Math.floor((fechaActual - this.fechaNacimiento) / ( 1000 * 365.25 * 24 * 60 * 60))
      }
    }

  }
</script>


<style>

  .seccion-cliente{
    font-size: 1rem;
    color: rgb(24, 23, 23);
    background-color: azure;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;

  }
  
</style>