<template>
    <canvas 
    @mousemove="dibujar" 
    @mousedown.left="iniciarDibujo"
    @mousedown.right="borrarBorrado"
    @mouseup=" puedoDibujar = false"  
    @contextmenu.prevent
    ref="canFirma" class="firma">

    </canvas>

</template>


<script>
    export default {
        data(){
            return {
                contexto: null,
                x0: event.offsetX,
                y0: event.offsetY,
                puedoDibujar: false
            }
        },
        mounted(){
            // Recuperamos la referencia del canvas
            this.contexto = this.$refs.canFirma.getContext('2d')

        },
        methods: {
            dibujar(event){
                const x1 = event.offsetX
                const y1 = event.offsetY
                if (this.puedoDibujar){
                    this.contexto.beginPath()
                    this.contexto.moveTo(this.x0, this.y0)
                    this.contexto.lineTo(x1, y1)
                    this.contexto.stroke()
                }
                this.x0 = x1
                this.y0 = y1

            },
            iniciarDibujo(){
                this.contexto.strokeStyle = '#303030'
                this.contexto.lineWidth = 5
                this.contexto.lineCap = 'round'
                this.puedoDibujar = true
            },
            borrarBorrado() {
                this.contexto.strokeStyle = 'white'
                this.contexto.lineWidth = 10
                this.contexto.lineCap = 'round'
                this.puedoDibujar = true
            }


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