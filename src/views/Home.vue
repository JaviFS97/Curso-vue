<template>
	<v-row >
		<v-col>
			<v-row justify="center" class="home-titulo">			
				<h1>Súper Ópera</h1>					
			</v-row>
			<v-row>
				<v-col v-for="item in 12" :key="item">
					<v-card >
						<v-img width="200px" height="200px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/1024px-Solid_white.svg.png"></v-img>
					</v-card>
				</v-col>
			</v-row>
		</v-col>

	</v-row>
</template>


<style>
	.home-titulo{
		font-family: 'Great Vibes', cursive;
		font-size: 2rem;
		color: #553f75;
		text-shadow: 1px 1px 5px #acacac;
	}
</style>