<template>
    <v-layout justify-center align-center>
        <v-flex sm10>
            <v-slide-y-transition mode="out-in">
                <v-card>

                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tus datos
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-text-field label="Email" autofocus v-model="formulario.email" :error-messages="this.erroresEmail" @blur="$v.formulario.email.$touch()"></v-text-field>
                        <v-text-field label="Password" type="password" v-model="formulario.password" :error-messages="this.erroresPassword" @input="$v.formulario.password.$touch()" @keyup.enter="ingresar"></v-text-field>
                    </v-card-text>

                    <v-card-text>     
                        <v-layout justify-end>
                            <v-btn @click="ingresar" color="secondary" :disabled="$v.formulario.$invalid">Ingresar</v-btn>    
                        </v-layout>      
                    </v-card-text>

                    <v-card-actions>
                        <v-btn @click="restablecerPassword = true" flat color="secondary"> 
                            ¿Olvidaste tu contraseña?
                        </v-btn>
                    </v-card-actions>

                    <v-card-actions>
                        <v-btn :to="{name:'registro'}" flat color="secondary"> 
                            ¿No tienes cuenta? Registrate.
                        </v-btn>
                    </v-card-actions>


                    <!-- Restablecimiento de la contrasenia -->
                    <v-dialog max-width="600px" v-model="restablecerPassword" persistent>                        
                        <v-card>
                            <v-toolbar color="primary" dark card>
                                <v-toolbar-text>
                                    Reestablecer contraseña
                                </v-toolbar-text>                                
                            </v-toolbar>

                            <v-card-text class="subheading">
                                Ingresa la dirección de email con la que te registraste.
                            </v-card-text>

                            <v-card-text>
                                <v-text-field label="Email" autofocus v-model="emailEnvio" :error-messages="this.erroresEmailRestablecimiento" @blur="$v.emailEnvio.$touch()"></v-text-field>
                            </v-card-text>

                            <v-card-text>
                                <v-layout>
                                    <v-flex>
                                        <v-layout justify-start>
                                            <v-btn @click="restablecerPassword = false">
                                                Cancelar
                                            </v-btn>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex>
                                        <v-layout justify-end>
                                            <v-btn @click="enviarSolicitudPassword" color="secondary">
                                                Enviar
                                            </v-btn>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                        </v-card>
                        

                        
                    </v-dialog>

                </v-card>

            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>

<script>

    // Importamos las funciones que vamos a usar para la validacion de la variable 'email'.
    import {required, email, minLength, maxLength} from 'vuelidate/lib/validators'
    import {auth} from '@/firebase'
    

    export default {
        data(){
            return {
                formulario: {   // Agrupamos en un objeto superior email y password para que a la hora de comprobar si el formulario es correcto no haya que ir input por input.
                    email: '',
                    password: '',
                },
                restablecerPassword: false,
                emailEnvio: '',
               

            }
        },
        // Propiedad de Vuelidate
        validations: {
            formulario: {
                // Validamos la variable con nombre 'email'.
                email: {
                    required,   // Se debe introducir un valor.
                    email       // El valor debe tener formato de email.
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(20)
                }
            },
            emailEnvio: {
                required,
                email
            }

        },
        computed: {
            erroresEmail() {
                let errores = []
                if (!this.$v.formulario.email.$dirty){ return errores}
                if (!this.$v.formulario.email.required){ errores.push("Ingresa tu email.")}
                if (!this.$v.formulario.email.email){ errores.push("Ingresa un email valido.")}
                return errores
            },
            erroresEmailRestablecimiento() {
                let errores = []
                if (!this.$v.emailEnvio.$dirty){ return errores}
                if (!this.$v.emailEnvio.required){ errores.push("Ingresa tu email.")}
                if (!this.$v.emailEnvio.email){ errores.push("Ingresa un email valido.")}
                return errores
            },
            erroresPassword() {
                let errores = []
                if (!this.$v.formulario.password.$dirty){ return errores}
                if (!this.$v.formulario.password.required){ errores.push("Ingresa tu contraseña.")}
                if (!this.$v.formulario.password.minLength){ errores.push("Ingresa un password con al menos 6 caracteres.")}
                if (!this.$v.formulario.password.maxLength){ errores.push("Ingresa un password con menos de 20 caracteres.")}
                return errores
            }
        },
        methods: {
            async ingresar() {
                // Por este motivo agrupamos email y password en un objeto formulario que los contenga.
                if(this.$v.formulario.$invalid) {
                    this.$v.formulario.$touch()
                    return
                }
  
                let ocupado = {
                    titulo: "Validando credenciales",
                    mensaje: "Estamos validando tu información..."
                }
                this.$store.commit('mostrarOcupado',ocupado)

                try{
                    await auth.signInWithEmailAndPassword(this.formulario.email, this.formulario.password)

                    
                    /**
                     * Lo asociamos con el usuario que esta presente en la propiedad state de vuex. Dos formas:
                     *  1. Sin uso de mutacion: this.$store.state.usuario = usuario
                     *  2. Haciendo uso de mutacion.
                     */ 
                    this.$store.commit('ocultarOcupado')
                    // Saludamos al usuario que acaba de logearse   
                    this.$store.commit('mostrarNotificacionExito', "Has inicido sesion.", 4000)
                    this.$router.push({ name: 'home'})
                }catch(error){
                    this.$store.commit('ocultarOcupado')
                    this.$store.commit('mostrarNotificacionError', "Email o contraseña incorrectas.", 4000)
                            
                    switch(error.code){
                        case 'auth/invalid-email':
                        case 'auth/user-not-found':
                        case 'auth/wrong-password':
                            this.$store.commit('mostrarNotificacionError', "Email y/o contraseña incorrectas.", 4000)
                            break
                        
                        default:
                            this.$store.commit('mostrarNotificacionError', "Ocurrió un error durante el login.", 4000)
                            break
                    }
                }
            },
            async enviarSolicitudPassword() {
                this.restablecerPassword = false
                            
                let ocupado = {
                    titulo: "Restableciendo contraseña",
                    mensaje: "Estamos enviando la información..."
                }
                this.$store.commit('mostrarOcupado',ocupado)

                try {
                    await auth.sendPasswordResetEmail(this.emailEnvio)
                    this.$store.commit('mostrarNotificacionExito', "Envio de correo satisfactorio.", 4000)
                }catch(error){
                    this.$store.commit('mostrarNotificacionError', "Ocurrió un error.", 4000)
                }
                this.$store.commit('ocultarOcupado')
            }

        }

    }
</script>