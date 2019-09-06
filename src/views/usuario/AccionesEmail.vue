<template>
    <div>
        
    </div>
</template>

<script>
    import {auth} from '@/firebase'
    export default {
        created(){
            this.validar()
        },
        methods: {
            async validar(){

                let mode = this.$route.query.mode
                let oobCode = this.$route.query.oobCode

                switch(mode){
                    case 'verifyEmail':

                        var ocupado = {
                            titulo: "Comprobando validacion",
                            mensaje: "Estamos comprobando los datos..."
                        }
                        this.$store.commit('mostrarOcupado',ocupado)
                        try{
                            await auth.applyActionCode(oobCode)
                            this.$store.commit('mostrarNotificacionExito', "Validación exitosa, introduce tus credenciales para seguir.", 4000)   
                            this.$router.push( {name:'login'} )
                        }catch(error){
                            this.$store.commit('mostrarNotificacionError', "Validación erronea,intentelo más tarde.", 4000)   
                        }
                        this.$store.commit('ocultarOcupado')
                        break

                }
            }
        }
    
    }
</script>