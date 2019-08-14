<template>
    <div class="seccion">
        <div>
            Introduce email: <input v-model='email' @keyup.enter="actualizarEmail" type="text">
        </div>
    </div>

</template>


<script>
    export default {
        props: ['emailRecibidoDesdeEntrada'],

        data(){
            return{
                email: ''
            }
        },
        methods:{
            actualizarEmail(event){       
                this.email = event.target.value      
                this.$emit('onCambioEmail', this.email)

            }
        },
        created() {
            this.email = this.emailRecibidoDesdeEntrada
        }
    }
</script>