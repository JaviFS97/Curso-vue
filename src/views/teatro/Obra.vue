<template>
    <v-container v-if="obra">
      
        <v-row justify="center">
            <h1> {{obra.titulo}} </h1>
        </v-row>

        <v-row justify="center" class="pa-5">
            <v-card class="ma-5 ">
                <v-img :src="obra.portada"></v-img>
            </v-card>          
        </v-row>

        <v-row justify="center">       
            <v-btn 
            :to="{name: 'presentacion', params:{ oid: p.obra.oid, tid: p.teatro.tid, fecha: p.fecha}}" v-for="p in obra.presentaciones" :key="p.pid" >
                {{ p.teatro.nombre + " - " + p.fecha}}
            </v-btn>
        </v-row>

    </v-container>   
</template>

<script>
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
                this.$router.push({name:'404'})
        }
    }
</script>