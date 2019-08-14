<template>
    <div class="seccion">
        <div>
            <input v-model="email" type="text">
        </div>

        <div>
            Email: {{email}}
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
            }
        },
        created() {
            this.email = this.emailRecibidoDesdeEntrada
        }
    }
</script>