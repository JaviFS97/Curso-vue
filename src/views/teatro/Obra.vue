<template>
    <v-container>
      
        <v-row justify="center">
            <h1> {{obra.titulo}} </h1>
        </v-row>

        <v-row justify="center" class="pa-5">
            <v-card class="ma-5 ">
                <v-img :src="obra.portada"></v-img>
            </v-card>          
        </v-row>

        <v-row justify="center">       
            <v-btn v-for="presentacion in obra.presentaciones" :key="presentacion.pid">
                {{ presentacion.teatro.nombre + " - " + presentacion.fecha}}
            </v-btn>
        </v-row>

    </v-container>   
</template>

<script>
import { log } from 'util';
    export default {
        data(){
            return {
                obra: null
            }
        },
        computed: {
            obras(){
				return this.$store.state.teatro.obras
            }
        },
        created(){
            // Recuperamos del path ($route) el parametro oid.
            let oid = this.$route.params.oid

            // Como sabemos la lista de obras por el store, y sabemos la oid de la obra por el path.
            this.obra = this.obras.find( obra => obra.oid == oid)
            // Si no hay ninguna obra con esa oid, redirigir a un 404
            if (!this.obra)
                log("404")
        }
    }
</script>