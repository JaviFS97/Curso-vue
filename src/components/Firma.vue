<template>
    <canvas ref="canFirma" class="firma">

    </canvas>

</template>


<script>
    export default {
        data(){
            return {
                contexto: null
            }
        },
        mounted(){
            // Recuperamos la referencia del canvas
            this.contexto = this.$refs.canFirma.getContext('2d')
            this.contexto.strokeStyle = '#303030'
            this.contexto.lineWidth = 5
            this.contexto.lineCap = 'round'
        }
    }
</script>



<style>
    .firma{ 
        border-radius: 5px;
        margin: 10px;
        cursor: pointer;
        background-color: white;
    }
    
</style>