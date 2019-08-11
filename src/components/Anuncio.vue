<template>
  <div class="anuncio">
      <span>
          {{ peliculas[indicePelicula] }}
      </span>
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
    
</style>
