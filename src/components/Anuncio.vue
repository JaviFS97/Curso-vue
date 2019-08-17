<template>
  <div class="anuncio">
      <!-- Vue proporciona el componente transition. Que permite incluir transiciones 
      entrada/salida de cualquier componente que sea(ver https://vuejs.org/v2/guide/transitions.html)
      
      El nombre de la transicion sirve para vincular el componente con las animaciones creadas
      en sl codigo css. 
      
      El modo 'out-in' significa que hasta que el elemento presente en la vista no haya terminado
      su animacion de salida, no entrara el nuevo elemento

      Es nesario asignar una key al span porque la animacion se ejecuta por cada elemento que cambia.
      Si no se asinga una key el span representa un elemento unico.

      -->
      <transition name="mitransicion-fade" mode="out-in"> 
        <span :key="indicePelicula">
            {{ peliculas[indicePelicula] }}
        </span>      
      </transition>

  </div>

</template>

<script>
import { setInterval } from 'timers';
    export default {
        data(){
            return {
                peliculas: [
                    'Frozen - 15:00',
                    'Solo en casa - 17:30',
                    'Los vengadores - 19:00'
                ],
                indicePelicula: 0
            }
        },
        methods:{
            mostrarPeliculas(){
                this.indicePelicula++;
                if(this.indicePelicula == this.peliculas.length){
                    this.indicePelicula = 0
                    // Si queremos destruir el componente
                    // this.$destroy()
                }

            }
        },

        beforeCreate() {
            console.log('beforeCreate')
        },
        created() {
            console.log('created')    
        },
        beforeMount() {
            console.log('beforeMount')
        },
        mounted() {
            console.log('mounted')
            setInterval( this.mostrarPeliculas, 2000 )
        },
        beforeUpdate() {
            console.log('beforeUpdate')
        },
        updated() {
            console.log('updated')
        },
        beforeDestroy() {
            console.log('beforeDestroy')
        },
        destroyed() {
            console.log('destroyed')
        }

    }
</script>

<style>
    .anuncio {
        margin: 10px;
        font-size: 1.5rem;

        border-top-style: solid;
        border-top-width: 1px;

        border-bottom-style: solid;
        border-bottom-width: 1px;
    }

    /*  Cada transicion tiene 2 acciones: la entrada y la salida.
        La entrada esta formada por: fade-enter y fade-enter-active.
        La salida por: fade-leave y fade-leave-active.
    */

    .mitransicion-fade-enter {
        opacity: 0;
    }

    .mitransicion-fade-enter-active {
        transition: opacity 1s ease-out;
    }

    .mitransicion-fade-leave {
        transition: opacity .6s ease-out;
        opacity: 0;
    }
    
</style>
