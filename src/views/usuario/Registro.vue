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
                        <v-text-field label="email"></v-text-field>
                        <v-text-field label="password" type="password"></v-text-field>
                    </v-card-text>
                    <v-card-text>     
                        <v-layout justify-end>
                            <v-btn @click="vista++" color="secondary">Siguiente</v-btn>    
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
                        <v-layout justify-end>
                            <v-btn @click="vista++" color="secondary">Siguiente</v-btn>    
                        </v-layout>     
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
                        <v-layout justify-end>
                            <v-btn @click="vista++" color="secondary">Registrarse</v-btn>    
                        </v-layout>     
                    </v-card-text>                                            
                </v-card>


            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
     
        data() {
            return {
                vista: 1,
                fechaNacimiento: null,
            }
        }
    }
</script>