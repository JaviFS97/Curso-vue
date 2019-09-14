<template>
    <v-layout text-center align-start justify-center class="mt-10">
        
        <v-card v-if="usuario" max-width="250px">
            
            <v-btn v-if="!editando" @click=" editar()" color="secondary" small fab absolute top right>
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
                    {{ usuario.nombre + ' ' + usuario.apellidos }}
                </div> 
                <v-img class="ma-2 fotoPerfil" :src=" usuario.fotoPerfil" alt=""></v-img>
                <div class="ma-5 descripcion">
                    {{ usuario.descripcion }}
                </div>
                <a :href="usuario.biografia" class="ma-2">Biografia</a>
            </v-card-text>

            <!-- Card de edicion -->
            <v-card-text v-if="editando">

                <v-text-field label="Nombre" v-model="formulario.nombre"></v-text-field>
                <v-text-field label="Apellidos" v-model="formulario.apellidos"></v-text-field>
                
                <v-img class="ma-2 fotoPerfil" :src=" usuario.fotoPerfil" alt=""></v-img>
                <div class="mt-5">
                    <v-textarea label="Descripcion" v-model=" formulario.descripcion" counter="300"></v-textarea>
                </div>
                <a :href="usuario.biografia" class="ma-2">Biografia</a>
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
                    descripcion: ''
                }
            }
        },
        computed: {
            usuario(){
                return this.$store.state.sesion.usuario
            }
        },
        methods:{
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
                                                                                  descripcion: this.formulario.descripcion})
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