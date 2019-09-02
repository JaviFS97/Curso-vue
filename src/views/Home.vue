<template>
	<v-container>

		<v-row justify="center" class="home-titulo">			
			<h1>Súper Ópera</h1>					
		</v-row>
		<v-row>			
			<v-col xs="12" sm="6" md="4" v-for="obra in obras" :key="obra.oid">
				<v-card :to="{name:'obra', params:{ oid: obra.oid}}">
					<v-img :src="obra.portada">
						<v-row justify="center" class="home-obra-titulo">							
								{{obra.titulo}}
						</v-row>

					</v-img>
				</v-card>
			</v-col>			
		</v-row>

	</v-container>

</template>


<script>
	export default {
		computed: {
			obras(){
				return this.$store.state.teatro.obras
			}
		}	
	}
</script>


<style>
	.home-titulo{
		font-family: 'Great Vibes', cursive;
		font-size: 2rem;
		color: #553f75;
		text-shadow: 1px 1px 5px #acacac;
	}

	.home-obra-titulo{
		font-size: 2rem;
		color: white;
		opacity: 0.9;
	}

</style>