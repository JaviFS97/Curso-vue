<template>
    <v-layout text-center align-start justify-center class="mt-10">
        <v-card v-if="usuario">
            
            <v-btn v-if="!editando" @click="editando = !editando" color="secondary" small fab absolute top right>
                <v-icon >edit</v-icon>
            </v-btn>

            <v-btn v-if="editando" @click="editando = !editando" color="error" small fab absolute top right>
                <v-icon>close</v-icon>
            </v-btn>

            <v-btn v-if="editando" @click="actualizarDatos()" color="accent" small fab absolute top left>
                <v-icon>done</v-icon>
            </v-btn>

            <v-card-text >
                <div v-if="!editando" class="ma-2">
                    {{ usuario.nombre + ' ' + usuario.apellidos }}
                </div>
                <v-text-field v-if="editando" label="Nombre" autofocus v-model="formulario.nombre"></v-text-field>
                <v-text-field v-if="editando" label="Apellidos" autofocus v-model="formulario.apellidos"></v-text-field>
                
                <v-img class="ma-2 fotoPerfil" :src=" usuario.fotoPerfil" alt=""></v-img>
                <div>
                    {{ usuario.descripcion }}
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
                    nombre: this.$store.state.nombre,
                    apellidos: this.$store.state.apellidos
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
                    apellidos: this.formulario.apellidos
                }
                try{
                    await db.collection('usuarios').doc(this.usuario.uid).update({nombre: this.formulario.nombre, apellidos: this.formulario.apellidos})
                    this.$store.commit('sesion/actualizarNombreYApellidos', cambiosUsuario)
                    this.$store.commit('mostrarNotificacionExito', "Datos actualizados con exito.", 4000)
                }catch(error){
                    this.$store.commit('mostrarNotificacionError', "Error al actualizar los datos.", 4000)
                }
                finally{
                    this.$store.commit('ocultarOcupado')
                    this.editando = !this.editando
                }
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
</style>