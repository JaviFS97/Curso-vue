<template>
    <v-layout justify-center="" align-center>
        <v-flex  sm10>
            <v-slide-y-transition mode="out-in">
                <v-card v-if="email" >

                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Introduce una nueva contraseña para {{this.email}}
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-text-field label="password" type="password" v-model="formulario1.password" :error-messages="erroresPassword" @input="$v.formulario1.password.$touch()"></v-text-field>
                        <v-text-field label="repetir password" type="password" v-model="formulario1.repetirPassword" :error-messages="erroresRepetirPassword" @input="$v.formulario1.repetirPassword.$touch()"  @keydown.enter="asignarNuevaContrasenia()"></v-text-field>
                    </v-card-text>

                    <v-card-text>     
                        <v-layout justify-end>
                            <v-btn @click="asignarNuevaContrasenia()" color="secondary" :disabled="$v.formulario1.$invalid">Siguiente</v-btn>    
                        </v-layout>       
                    </v-card-text>

                </v-card>
            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>
<script>
    import {required, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'
    import {auth} from '@/firebase'
    export default {
        data(){
            return {
                email: '',
                formulario1:{
                    password: '',
                    repetirPassword: '',
                },
                oobCode: '',
            }
        },
         validations: {
            formulario1: {
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(20)
                },
                repetirPassword: {
                    required,
                    sameAs: sameAs('password')
                }
            },
        },
        computed:{
            erroresPassword() {
                let errores = []
                if (!this.$v.formulario1.password.$dirty){ return errores}
                else{
                    if (!this.$v.formulario1.password.required){ errores.push("Ingresa tu contraseña.")}
                    if (!this.$v.formulario1.password.minLength){ errores.push("Ingresa un password con al menos 6 caracteres.")}
                    if (!this.$v.formulario1.password.maxLength){ errores.push("Ingresa un password con menos de 20 caracteres.")}
                    return errores
                }

            },
            erroresRepetirPassword() {
                let errores = []
                if (!this.$v.formulario1.password.$dirty){ return errores}
                else{
                    if (!this.$v.formulario1.repetirPassword.sameAs){ errores.push("Las contraseñas deben coincidir.")}
                    return errores                    
                }

            },
        },
        created(){
            this.validar()
        },
        methods: {
            async validar(){

                let mode = this.$route.query.mode
                this.oobCode = this.$route.query.oobCode

                switch(mode){
                    case 'verifyEmail':

                       
                        this.$store.commit('mostrarOcupado',
                            {titulo: "Comprobando validacion",
                            mensaje: "Estamos comprobando los datos..."
                        })
                        try{
                            await auth.applyActionCode(this.oobCode)
                            this.$store.commit('mostrarNotificacionExito', "Validación exitosa, introduce tus credenciales para seguir.", 4000)   
                            this.$router.push( {name:'login'} )
                        }catch(error){
                            this.$store.commit('mostrarNotificacionError', "Validación erronea,intentelo más tarde.", 4000)   
                        }
                        this.$store.commit('ocultarOcupado')
                        break

                    case 'resetPassword':
                       
                    
                        this.$store.commit('mostrarOcupado',{
                            titulo: "Comprobando validacion",
                            mensaje: "Estamos comprobando los datos para la validacion del codigo de cambio de contraseña..."
                        })
                        try{
                            this.email = await auth.verifyPasswordResetCode(this.oobCode)
                            this.$store.commit('mostrarNotificacionInformacion', "Ingresa una nueva contraseña para " + this.email, 4000)      

                        }catch(error){
                            this.$store.commit('mostrarNotificacionError', "Validación erronea del codigo de cambio de contraseña, intentelo más tarde.", 4000)   
                        }
                        this.$store.commit('ocultarOcupado')
                        break

                }
            },
            async asignarNuevaContrasenia(){
                var ocupado = {
                    titulo: "Cambiando la contraseña",
                    mensaje: "Estamos enviando tu nueva contraseña al servidor..."
                }
                this.$store.commit('mostrarOcupado',ocupado)
                try{
                    await auth.confirmPasswordReset(this.oobCode, this.formulario1.password)
                    this.iniciarSesion()
                }catch(error){
                    this.$store.commit('mostrarNotificacionError', "Error al asignar nueva contraseña, intentelo más tarde.", 4000)   
                }
                this.$store.commit('ocultarOcupado')
                
            },
            async iniciarSesion(){
                await auth.signInWithEmailAndPassword(this.email, this.formulario1.password)

                this.$store.commit('ocultarOcupado')
                // Saludamos al usuario que acaba de logearse   
                this.$store.commit('mostrarNotificacionExito', "Tu contraseña ha sido cambiando con exito, has iniciado sesión.", 4000)
                this.$router.push({ name: 'home'})
            }
            
        }
    
    }
</script>