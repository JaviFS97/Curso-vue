<template>
  <div class="seccion">
      <span>Boletos</span>
      <div>{{ this.boletos}}</div>
      <button class='boton' v-on:click="actualizarCantidad(-1)">-</button>
      <button class='boton' v-on:click="actualizarCantidad(+1)">+</button>
      <div v-bind:class="this.claseComision">${{ this.comision}}</div>
  </div>

</template>


<script>
    const MAXBOLETOS = 10
    export default {
        data(){
            return{
                boletos: 1,
                comision: 10,
                claseComision: 'neutro'
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
        },
        watch: {
            boletos(newBoletos, oldBoletos){
                if ( newBoletos > oldBoletos){
                    this.comision += 10
                    this.claseComision = 'incremento'
                }
                
                    
                else{
                    this.comision -= 15
                    this.claseComision = 'decremento'
                }


                if (this.comision < 0){
                    this.comision = 0
                    this.claseComision = 'neutro'
                }

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


    .neutro {
        color: black;
    }

    .incremento {
        color: rgb(4, 211, 4);
    }

    .decremento {
        color: red;
    }

</style>