<template>
  <div >
      <div>{{ this.boletos}}</div>
      <button class='boton' v-on:click="actualizarCantidad(-1)">-</button>
      <button class='boton' v-on:click="actualizarCantidad(+1)">+</button>
  </div>

</template>


<script>
    const MAXBOLETOS = 10
    export default {
        data(){
            return{
                boletos: 1
            }
        },
        methods:{
            actualizarCantidad(cantidad){
                this.boletos += cantidad
                if (this.boletos > MAXBOLETOS)
                    this.boletos = MAXBOLETOS 
                else if(this.boletos < 0)
                    this.boletos = 0   
            }
        }   
    }
</script>

<style>
    .boton {
        background-color: blue;
        border-radius: 5px;
        border-style: none;
        color: white;
        font-size: 15px;
        padding: 3px 10px;
        margin: 3px 5px;
        cursor: pointer;
    }
</style>