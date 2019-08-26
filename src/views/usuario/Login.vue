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
                        <v-text-field label="Email" v-model="email" :error-messages="this.erroresEmail" @blur="$v.email.$touch()"></v-text-field>
                        <v-text-field label="Password" type="password" v-model="password" :error-messages="this.erroresPassword" @input="$v.password.$touch()"></v-text-field>
                    </v-card-text>
                    <v-card-text>     
                        <v-layout justify-end>
                            <v-btn @click="vista++" color="secondary">Siguiente</v-btn>    
                        </v-layout>           
                        
                    </v-card-text>
                </v-card>

            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>

<script>

    // Importamos las funciones que vamos a usar para la validacion de la variable 'email'.
    import {required, email, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        data(){
            return {
                email: '',
                password: ''
            }
        },
        // Propiedad de Vuelidate
        validations: {
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
        computed: {
            erroresEmail() {
                let errores = []
                if (!this.$v.email.$dirty){ return errores}
                if (!this.$v.email.required){ errores.push("Ingresa tu email.")}
                if (!this.$v.email.email){ errores.push("Ingresa un email valido.")}
                return errores
            },
            erroresPassword() {
                let errores = []
                if (!this.$v.password.$dirty){ return errores}
                if (!this.$v.password.required){ errores.push("Ingresa tu contraseña.")}
                if (!this.$v.password.minLength){ errores.push("Ingresa un password con al menos 6 caracteres.")}
                if (!this.$v.password.maxLength){ errores.push("Ingresa un password con menos de 20 caracteres.")}
                return errores
            }
        }

    }
</script>