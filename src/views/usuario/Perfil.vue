<template>
    <v-layout text-xs-center align-start justify-center>
        <v-card>
            <v-card-text>
                <div class="ma-2">
                    Nombre y apellidos
                </div>
                <img class="ma-2 fotoPerfil" v-bind:src="require('@/assets/fotoUsuario.png')" alt="">
                <div>
                    Descripcion
                </div>
                <a href="" class="ma-2">Biografia</a>
            </v-card-text>
        </v-card>

    </v-layout>
</template>


<style>
    .fotoPerfil{
        width: 200px;
        height: 100%;
    }
</style>