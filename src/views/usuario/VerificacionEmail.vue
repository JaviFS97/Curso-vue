<template>
    <v-layout justify-center align-center>
        <v-flex>
            <v-card>
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>
                        Confirma tu direccion de correo
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <span>Te hemos enviado un correo de verificacion a la dirección especificada.</span>
                </v-card-text>
                <v-card-text>
                    <v-btn @click="reenviarEmail" color="secondary">Reenviar Email</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import {auth} from '@/firebase'
    export default {
        methods: {
            async reenviarEmail(){
                try{
                    await auth.currentUser.sendEmailVerification()
                    this.$store.commit('mostrarNotificacionExito', "Te hemos enviado un nuevo correo de verificación.", 4000)
                }catch(error){
                     this.$store.commit('mostrarNotificacionError', "Ocurrió un error enviando el email de verificacion.", 4000)
                }
            }
        }
    }
</script>