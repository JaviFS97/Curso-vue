<template>
  <div class="seccion-cliente">
    <div>
      <!-- Expresion js -->
      <span> {{ nombres + " " + apellidos }}</span>
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
        edad:25
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