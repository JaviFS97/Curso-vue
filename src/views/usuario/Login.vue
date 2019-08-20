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
                        <v-text-field label="Email"></v-text-field>
                        <v-text-field label="Password" type="password"></v-text-field>
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