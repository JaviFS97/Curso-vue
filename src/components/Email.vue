<template>
    <div class="seccion">
        <div>
            <input @keyup="actualizarEmail" type="text">
        </div>

        <div>
            Email: {{email}}
        </div>

    </div>

</template>


<script>
    export default {
        data(){
            return{
                email: ''
            }
        },
        methods:{
            actualizarEmail(event){                
                this.email = event.target.value
            }
        }
    }
</script>