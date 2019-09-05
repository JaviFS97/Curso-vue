<template>
    <v-layout justify-center="" align-center>
        <v-flex sm10>
            <v-slide-y-transition mode="out-in" @enter="entrarVistaCalendario">
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
                    <v-card-actions>
                        <v-btn :to="{name:'login'}" flat color="secondary"> 
                            ¿Ya tienes cuenta? Inicia sesión.
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <v-card v-if="vista==2" :key="2">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tu nombre y apellidos
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field label="Nombre" v-model="formulario2.nombre" :error-messages="erroresNombre" @blur="$v.formulario2.nombre.$touch()"></v-text-field>
                        <v-text-field label="Apellidos" v-model="formulario2.apellidos" :error-messages="erroresApellidos" @blur="$v.formulario2.apellidos.$touch()"></v-text-field>
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
                                        <v-btn @click="siguienteVista(2)" color="secondary" justify-end>Siguiente</v-btn>        
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
                            <v-date-picker v-model="fechaNacimiento" locale="es-co" :max="fechaMaximaISO" ref="referenciaCalendario" reactive></v-date-picker>
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
                                        <v-btn @click="registrar()" color="secondary">Registrarse</v-btn>    
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
    // Importamos el modulo auth del archivo de firebase
    import {auth} from '@/firebase'

    // Validador personalizado para que el nombre y apellidos puedan contener espacios y acentos.
    const validacionNombresYApellidos = (value) => /^(?! )(?!.* {2})[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)


    export default {
     
        data() {
            return {
                vista: 1,
                formulario1: {
                    email: '',
                    password: '',
                    repetirPassword: '',
                },
                formulario2: {
                    nombre: '',
                    apellidos: ''
                },
                fechaNacimiento: null,
                fechaMaximaISO: ''
            }
        },
        created(){
            let fechaActual = new Date()
            // Solo la gente con 13 años de edad puede registrarse
            let fechaMaxima = new Date( fechaActual.setFullYear(fechaActual.getFullYear() - 13)).toISOString()
            // Se transforma a iso porque es el formato que pide el componente de vuetify.
            this.fechaMaximaISO = fechaMaxima.substring(0,10)

           
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
            },
            formulario2: {
                nombre: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(20), 
                    validacionNombresYApellidos // Validacion propia, eliminamos la validacion de vuelidate 'alpha'
                },
                apellidos: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(30), 
                    validacionNombresYApellidos // Validacion propia, eliminamos la validacion de vuelidate 'alpha'
                }
            },
            fechaNacimiento: {
                required
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

            },
            erroresNombre() {
                let errores = []
                if (!this.$v.formulario2.nombre.$dirty){ return errores}
                else{
                    if (!this.$v.formulario2.nombre.required){ errores.push("Ingresa tu nombre.")}
                    if (!this.$v.formulario2.nombre.minLength){ errores.push("Ingresa un nombre con al menos 6 caracteres.")}
                    if (!this.$v.formulario2.nombre.maxLength){ errores.push("Ingresa un nombre con menos de 20 caracteres.")}
                    if (!this.$v.formulario2.nombre.validacionNombresYApellidos){ errores.push("Tu nombre solo puede contener letras del alfabeto.")}
                    return errores
                } 
            },
            erroresApellidos() {
                let errores = []
                if (!this.$v.formulario2.apellidos.$dirty){ return errores}
                else{
                    if (!this.$v.formulario2.apellidos.required){ errores.push("Ingresa tu apellido.")}
                    if (!this.$v.formulario2.apellidos.minLength){ errores.push("Ingresa un apellido con al menos 6 caracteres.")}
                    if (!this.$v.formulario2.apellidos.maxLength){ errores.push("Ingresa un apellido con menos de 20 caracteres.")}
                    if (!this.$v.formulario2.apellidos.validacionNombresYApellidos){ errores.push("Tu apellido solo puede contener letras del alfabeto.")}
                    return errores
                } 
            }                         
        },
        methods: {
            siguienteVista(numVista){
                switch(numVista){
                    //case 1:
                        // No es necesario porque el boton siguiente no se activa hasta que el formulario1 sea valido.
                    case 2:
                        if (this.$v.formulario2.$invalid)
                            this.$v.formulario2.$touch()
                        else
                            this.vista++

                } 
            },
            entrarVistaCalendario(){
                this.$refs.referenciaCalendario.activePicker = 'YEAR'
            },
            
            async registrar(){
                if(this.$v.fechaNacimiento.$invalid)
                    return
                
                try{
                    let ocupado = {
                        titulo: "Creando registro",
                        mensaje: "Estamos registrando tu información..."
                    }
                    this.$store.commit('mostrarOcupado',ocupado)
                    let uid = await auth.createUserWithEmailAndPassword(this.formulario1.email, this.formulario1.password)

                    // Creamos un usuario
                    let usuario = {
                        uid,
                        userName: this.formulario2.nombre,
                        nombre: this.formulario2.nombre,
                        apellidos: this.formulario2.apellidos,
                        sexo: 'F',
                        descripcion: 'añadir descripcion',
                        biografia: 'https://es.wikipedia.org/wiki/Isaac_Newton',
                        fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg'
                    }

                    this.$store.commit('sesion/actualizarUsuario', usuario)
                    this.$store.commit('mostrarNotificacionExito', "Registro exitoso.", 4000)
                    this.$router.push({ name: 'home'})

                }catch(error){
                    this.$store.commit('mostrarNotificacionError', "Ocurrió un error durante el registro.", 4000)
                }

                this.$store.commit('ocultarOcupado')
                

            }
        }
    }
</script>