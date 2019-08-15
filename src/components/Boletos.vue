<template>
  <div class="seccion">
      <span>Boletos:</span>
      <div v-if="this.boletos==0 && this.pago==false" class="mensaje informacion"> Seleccion al menos un boleto.</div>
      <div v-else-if="this.boletos>=0 && this.pago==false" class="mensaje advertencia"> Recuerda completar la compra.</div>
      <div v-else class="mensaje exito"> ¡Bienvenido!</div>
      <div>{{ this.boletos}}</div>
      <button class='boton' v-on:click="actualizarCantidad(-1)">-</button>
      <button class='boton' v-on:click="actualizarCantidad(+1)">+</button>
      <div>
        <button class='boton' @click='pago = true' v-if="pago==false && boletos >=1">Pagar</button>
        <button class='boton' @click='reiniciarPago()' v-else-if="pago==true">Reiniciar</button>
      </div>
      
      <div v-bind:class="this.claseComision">${{ this.comision}}</div>

  </div>

</template>


<script>
    const MAXBOLETOS = 10
    export default {
        data(){
            return{
                boletos: 0,
                comision: 0,
                claseComision: 'neutro',
                pago: false
            }
        },
        methods:{
            actualizarCantidad(cantidad){
                this.boletos += cantidad
                if (this.boletos > MAXBOLETOS)
                    this.boletos = MAXBOLETOS 
                else if(this.boletos < 0)
                    this.boletos = 0   
            },
            reiniciarPago(){
                this.boletos = 0
                this.pago = false
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
        background-color: rgb(12, 12, 179);
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

    .mensaje {
        border-radius: 5px;
        border-width: 4px;
        border-style: dashed;
        color: black;
    }

    .informacion {
        color: blue;
    }

    .advertencia {
        color: red;
    }

    .exito {
        color: green;
    }

</style>