<template>
    <v-layout align-center justify-center>
        <v-flex>
            <v-card class="elevation-6">
                <v-card-text class="headline">
                    No encontramos la página que buscabas.
                </v-card-text>
                <v-card-text>
                    Verifica que la URL ingresada sea válida
                </v-card-text>
                <v-card-actions>
                    <v-btn :to="{name:'home'}" flat  color="secondary">Regresar al Home</v-btn>
                </v-card-actions>                
            </v-card>
        </v-flex>
    </v-layout>
</template>