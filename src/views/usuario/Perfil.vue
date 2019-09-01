<template>
    <v-layout text-xs-center align-start justify-center>
        <v-card v-if="usuario">
            <v-card-text>
                <div class="ma-2">
                    {{ usuario.nombre + ' ' + usuario.apellidos }}
                </div>
                
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
    export default {
        computed: {
            usuario(){
                return this.$store.state.sesion.usuario
            }
        }
    }
</script>


<style>
    .fotoPerfil{
        width: 200px;
        height: 100%;
    }
</style>