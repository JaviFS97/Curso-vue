<template>
    <div>

        <div class="seccion">
            <transition name="mensaje-scale" mode="out-in"> 
                <div v-if="this.boletos==0 && this.pago==false" class="mensaje informacion" :key="1"> Selecciona al menos un boleto.</div>
                <div v-else-if="this.boletos>=0 && this.pago==false" class="mensaje advertencia" :key="2"> Recuerda completar la compra.</div>
                <div v-else class="mensaje exito" :key="3"> ¡Bienvenido!</div>
            </transition>

            <span>Asientos: </span>
            <div>
                <transition-group name="escogerAsiento">
                    <button v-on:click="addAsiento(asiento, index)" v-for="(asiento, index) in asientos" :key="asiento">{{asiento}}</button>
                </transition-group>
                
            </div>
            
        </div>

        <div class="seccion">
            <span>Boletos:</span>

            <div>{{ this.boletos}}</div>
            <div>
                <button v-on:click="addAsientoSeleccionado(asiento, index)" v-for="(asiento, index) in asientosSeleccionados" :key="index">{{asiento}}</button>
            </div>
            <div>
                <button class='boton' @click='pago = true' v-if="pago==false && boletos >=1">Pagar</button>
                <button class='boton' @click='reiniciarPago()' v-else-if="pago==true">Reiniciar</button>
            </div>
            
            <div v-bind:class="this.claseComision">Comision: ${{ this.comision}}</div>

        </div>


    </div>

</template>


<script>
    export default {
        data(){
            return{
                comision: 0,
                claseComision: 'neutro',
                pago: false,
                asientos: [
                    'A1', 'A2', 'A3', 'A4', 'A5',
                    'B1', 'B2', 'B3', 'B4', 'B5'
                ],
                asientosSeleccionados: []
            }
        },
        computed: {
            boletos() {
                return this.asientosSeleccionados.length
            }
        },
        methods: {
            reiniciarPago(){
                this.asientos.push(...this.asientosSeleccionados)
                this.asientosSeleccionados = []
                this.pago = false
                this.asientos.sort()
            },
            precioTotal(){
                return this.boletos * 100
            },
            // Añadir un asiento a la lista de asientos seleccionados
            addAsiento(asiento, index){
                this.asientos.splice(index, 1)
                this.asientosSeleccionados.push(asiento)
                this.asientosSeleccionados.sort()
            },
            // Añadir un asiento que esta en la lista de asientos seleccionados a la lista de asientos
           addAsientoSeleccionado(asiento, index){
                this.asientosSeleccionados.splice(index, 1)
                this.asientos.push(asiento)
                this.asientos.sort()
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

    /* Estas 3 propiedades son transiciones css */
    .mensaje-scale-enter{
        opacity: 0;
        
    }

    .mensaje-scale-enter-active{
        transition: opacity 0.6s ease-out;
        /* Vinculo la transisicion con la animacion*/
        animation: mensaje-in 0.3s ease-out forwards;
    }

    .mensaje-scale-leave{
        transition: opacity 0.2s ease-out;
        /* Vinculo la transisicion con la animacion*/
        animation: mensaje-out 0.2s ease-out forwards;
        opacity: 0;
    }

    /* Estas 2 propiedades son animaciones css */
    @keyframes mensaje-out {
        from{
            transform: scaleY(0)
        }
        to{
            transform: scaleY(1)
        }
        /*from == 0%, to == 100%*/
        
    }
    @keyframes mensaje-in {
        /* Lo hago con porcentajes para ver que se puede hacer de 2 formas.*/
        0%{
            transform: scaleY(0)
        }
        70%{
            transform: scaleY(1.2)
        }
        100%{
            transform: scaleY(1)
        }

        
    }


    /* Codigo para animar la seleccion de butacas. */

    .escogerAsiento-enter{
        opacity: 0;        
    }

    .escogerAsiento-enter-active{
        transition: opacity 0.3s ease-out;
        /* Vinculo la transisicion con la animacion*/
        animation: escogerAsiento-in 0.3s ease-out forwards;
    }

    .escogerAsiento-leave{
        transition: opacity 0.2s ease-out;
        /* Vinculo la transisicion con la animacion*/
        animation: escogerAsiento-out 0.2s ease-out forwards;
        opacity: 0;
    }

    @keyframes escogerAsiento-out {
        0%{
            transform: translateY(0px)
        }
        70%{
            transform: translateY(40px)
        }
        100%{
            transform: translateY(30px)
        }

    }
    @keyframes escogerAsiento-in {
        0%{
            transform: translateY(30px)
        }
        70%{
            transform: translateY(-10px) /* Se desplaza 10px hacia arriba respecto su posicion para dar efecto rebote */
        }
        100%{
            transform: translateY(0px)
        }

        
    }

</style>