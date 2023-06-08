<script>
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';
	export let data;
	var formats = data.formats;
</script>

<div class="container">
	<div class="main">
		<h1 class="title">JackSucksAtMemes</h1>

		<div class="formats">
			{#each formats as format}
				<img
					src={`${dev ? 'http://localhost:3000' : 'https://jsal-api.daanschenkel.nl'}/img/${
						format.id
					}`}
					alt={format.friendlyName}
					width="200"
					height="200"
					on:click={() => {
						goto(`/format/${format.id}`);
					}}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.main {
		background-color: #fff;

		margin: auto;

		/*border*/
		border-radius: 10px;

		margin-top: 20px;

		/*center*/
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding: 20px;
	}
	.title {
		font-size: 30px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		color: #000;
		margin-top: 0px;
		/*change color with animation*/
		animation: blink 5s infinite;
	}
	@keyframes blink {
		0% {
			color: #fe5292; /*JSAL*/
		}
		10% {
			color: #fecc50; /*JSAS*/
		}
		20% {
			color: #4dff63; /*JSAG*/
		}
		30% {
			color: #4ffef7; /*JMW*/
		}
		40% {
			color: #624eff; /*JSAC*/
		}
		50% {
			color: #005bff; /*No Context*/
		}
		60% {
			color: #43d5fd; /*GeogStuff*/
		}
		70% {
			color: #df467c; /*DS*/
		}
		80% {
			/*JSAE (gradient) */

			color: linear-gradient(90deg, #7e12fe 0%, #68ff1e 50%, #ffad0c 100%);
		}
		90% {
			color: #ff9ae8; /*Long channel name*/
		}
		100% {
			color: #ec417b; /*turd boi*/
		}
	}

	@-webkit-keyframes blink {
		0% {
			color: red;
		}
		20% {
			color: green;
		}
		40% {
			color: yellow;
		}
		60% {
			color: blue;
		}
		80% {
			color: orange;
		}
		100% {
			color: red;
		}
	}
	.formats {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
	.formats img {
		margin: 10px;
		border-radius: 10px;
		transition: 0.5s;
		cursor: pointer;
	}
	.formats img:hover {
		transform: scale(1.1);
	}
</style>
