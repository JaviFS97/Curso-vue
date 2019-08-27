<template>
    <v-layout justify-center="" align-center>
        <v-flex sm10>
            <v-slide-y-transition mode="out-in">
                <v-card v-if="vista==1" :key="1">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Registrate
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field label="email" v-model="formulario1.email" :error-messages="erroresEmail" @blur="$v.formulario1.email.$touch()"></v-text-field>
                        <v-text-field label="password" type="password" v-model="formulario1.password" :error-messages="erroresPassword" @input="$v.formulario1.password.$touch()"></v-text-field>
                        <v-text-field label="repetir password" type="password" v-model="formulario1.repetirPassword" :error-messages="erroresRepetirPassword" @input="$v.formulario1.repetirPassword.$touch()"  @keydown.enter="vista++"></v-text-field>
                    </v-card-text>
                    <v-card-text>     
                        <v-layout justify-end>
                            <v-btn @click="vista++" color="secondary" :disabled="$v.formulario1.$invalid">Siguiente</v-btn>    
                        </v-layout>            
                        
                    </v-card-text>
                </v-card>

                <v-card v-if="vista==2" :key="2">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tu nombre y apellidos
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field label="Nombre"></v-text-field>
                        <v-text-field label="Apellidos" type="password"></v-text-field>
                    </v-card-text>
                    <v-card-text>    
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-row justify="start">
                                        <v-btn @click="vista--">Anterior</v-btn>  
                                    </v-row>
                                    
                                </v-col>
                                <v-col>
                                    <v-row justify="end">
                                        <v-btn @click="vista++" color="secondary" justify-end>Siguiente</v-btn>        
                                    </v-row>
                                </v-col>
                            </v-row>      
                        </v-container>  
                        
                    </v-card-text>
                </v-card>

                <v-card v-if="vista==3" :key="3">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tu fecha de nacimiento
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-layout justify-center>
                            <v-date-picker v-model="fechaNacimiento" locale="es-co"></v-date-picker>
                        </v-layout >
                    </v-card-text>
                    <v-card-text>    
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-row justify="start">
                                        <v-btn @click="vista--">Anterior</v-btn>  
                                    </v-row>
                                </v-col>
                                <v-col>
                                    <v-row justify="end">
                                        <v-btn @click="vista++" color="secondary">Registrarse</v-btn>    
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container> 

                    </v-card-text>                                            
                </v-card>


            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>

<script>
    import {required, email, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'

    export default {
     
        data() {
            return {
                vista: 1,
                fechaNacimiento: null,
                formulario1: {
                    email: '',
                    password: '',
                    repetirPassword: '',
                }
            }
        },
        validations: {
            formulario1: {
                email: {
                    required,   
                    email       
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(20)
                },
                repetirPassword: {
                    required,
                    sameAs: sameAs('password')
                }
            }
        },
        computed: {
            erroresEmail() {
                let errores = []
                if (!this.$v.formulario1.email.$dirty){ return errores}
                else{
                    if (!this.$v.formulario1.email.required){ errores.push("Ingresa tu email.")}
                    if (!this.$v.formulario1.email.email){ errores.push("Ingresa un email valido.")}
                    return errores
                }

            },
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

            }            
        },
    }
</script>