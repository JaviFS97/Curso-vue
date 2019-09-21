<template>
    <v-layout text-center align-start justify-center class="mt-10">
        
        <v-card max-width="250px">
            <v-btn v-if=" puedoModificarUsuario && !editando" @click=" editar()" color="secondary" small fab absolute top right>
                <v-icon >edit</v-icon>
            </v-btn>

            <v-btn v-if="editando" @click=" editando = !editando" color="error" small fab absolute top right>
                <v-icon>close</v-icon>
            </v-btn>

            <v-btn v-if="editando" @click="actualizarDatos()" color="accent" small fab absolute top left>
                <v-icon>done</v-icon>
            </v-btn>

            <!-- Card informativa, sin estar editando -->
            <v-card-text v-if="!editando">
                <div >
                    {{ usuarioConsultar.nombre + ' ' + usuarioConsultar.apellidos }}
                </div> 
                <v-img class="ma-2 fotoPerfil" :src=" usuarioConsultar.fotoPerfil" alt=""></v-img>
                <div class="ma-5 descripcion">
                    {{ usuarioConsultar.descripcion }}
                </div>
                <a :href="usuarioConsultar.biografia" class="ma-2">Biografia</a>
            </v-card-text>

            <!-- Card de edicion -->
            <v-card-text v-if="editando">

                <v-text-field label="Nombre" v-model="formulario.nombre"></v-text-field>
                <v-text-field label="Apellidos" v-model="formulario.apellidos"></v-text-field>
                
                <v-img class="ma-2 fotoPerfil" :src=" usuarioConsultar.fotoPerfil" alt=""></v-img>
                <div class="mt-5">
                    <v-textarea label="Descripcion" v-model=" formulario.descripcion" counter="300"></v-textarea>
                </div>
                 <v-text-field label="Biografia" v-model="formulario.biografia"></v-text-field>
            </v-card-text>
        </v-card>

    </v-layout>
</template>


<script>
    //import store from '@/store'
    import {db} from '@/firebase'
    export default {
        data() {
            return{
                editando: false,
                formulario: {
                    nombre: '',
                    apellidos: '',
                    descripcion: '',
                    biografia: ''
                },
                usuarioConsultar: ''
            }
        },
        created(){
            this.consultarUsuario()
        },
        watch: {
            // Si cambia la ruta, lanzar la funcion de consultar usuario. Si no, vue reutiliza el componente con los datos del perfil anterior.
            '$route' (){
                this.consultarUsuario()
            }
        },
        computed: {
            usuario(){
                return this.$store.state.sesion.usuario
            },
            puedoModificarUsuario(){
                return this.usuario.userName == this.usuarioConsultar.userName
            }
        },
        methods:{
            async consultarUsuario(){
                let userNameParametro = this.$route.params.userName.toLowerCase()

                try{

                    let userNameDoc = await db.collection('userNames').doc(userNameParametro).get()

                    if(userNameDoc.exists){
                        let userName = userNameDoc.data()
                        let usuarioDoc = await db.collection('usuarios').doc(userName.uid).get()

                        if (usuarioDoc.exists){
                            this.usuarioConsultar = usuarioDoc.data()
                        }
                        else{
                            this.$router.push({name: '404'})
                        }
                    }else{
                        this.$router.push({name: '404'})
                    }
                }catch(error){
                    this.$router.push({name: '404'})
                }
            },
            async actualizarDatos(){
                let ocupado = {
                    titulo: "Validando credenciales",
                    mensaje: "Estamos actualizando tus datos..."
                }
                this.$store.commit('mostrarOcupado',ocupado)

                let cambiosUsuario = {
                    nombre: this.formulario.nombre,
                    apellidos: this.formulario.apellidos,
                    descripcion: this.formulario.descripcion
                }
                try{
                    await db.collection('usuarios').doc(this.usuario.uid).update({nombre: this.formulario.nombre,
                                                                                  apellidos: this.formulario.apellidos,
                                                                                  descripcion: this.formulario.descripcion,
                                                                                  biografia: this.formulario.biografia})
                    this.$store.commit('sesion/actualizarDatosUsuario', cambiosUsuario)
                    this.$store.commit('mostrarNotificacionExito', "Datos actualizados con exito.", 4000)
                }catch(error){
                    this.$store.commit('mostrarNotificacionError', "Error al actualizar los datos.", 4000)
                }
                finally{
                    this.$store.commit('ocultarOcupado')
                    this.editando = !this.editando
                }
            },

            editar(){
                // Cargamos los datos actuales del usuario.
                this.formulario.nombre = this.usuario.nombre
                this.formulario.apellidos = this.usuario.apellidos
                this.formulario.descripcion = this.usuario.descripcion
                this.formulario.biografia = this.usuario.biografia
                // Activamos el modo edicion.
                this.editando = true
            }
        }

        // beforeRouteEnter (to, from, next) {
        //     if(store.state.sesion.usuario)
        //         next()
        //     else
        //         next({name:'login'})
        // }
    }
</script>


<style>
    .fotoPerfil{
        width: 200px;
        height: 100%;
    }

    .descripcion{
        text-align: justify;
    }
</style>