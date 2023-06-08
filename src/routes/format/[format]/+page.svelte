<script>
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';
	export let data;
	var format = data.format;
	var inputs = {};
	var input = `${dev ? 'http://localhost:3000' : 'https://jsal-api.daanschenkel.nl'}/gen/${
		format.id
	}?input=${format.text
		.map((text) => {
			return text.default || '';
		})
		.join('|')}`;
	async function dataString() {
		var data = '';
		for (var i = 0; i < format.text.length; i++) {
			console.log(i, format.text.length);
			data += inputs[i] || '';
			if (i !== format.text.length - 1) data += '|';
		}
		return data;
	}
	async function generate() {
		var url = `${dev ? 'http://localhost:3000' : 'https://jsal-api.daanschenkel.nl'}/gen/${
			format.id
		}?input=${await dataString()}`;
		input = url;
	}
</script>

<div class="main">
	<button on:click={() => goto('/')} class="backButton">x</button>
	<h1 class="title">JackSucksAtMemes</h1>
	<h2 class="formatTitle">{format.friendlyName}</h2>
	<img src={`${input}`} alt={format.friendlyName} class="memeImg" id="result" />
	{#each format.text as text, i}
		<input
			type="text"
			placeholder="Text"
			on:input={(e) => {
				console.log(e.target.value, i);
				inputs[i] = e.target.value || '';
				generate();
			}}
			class="textInput"
		/>
	{/each}
	<button
		on:click={async () => {
			var data = await dataString();
			goto(`/download/${format.id}?input=${data}`);
		}}
		class="generateButton">Download</button
	>
</div>

<style>
	.main {
		background-color: #fff;
		width: 90%;
		height: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/*align items to center*/
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		/*border*/
		border-radius: 10px;
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
	.formatTitle {
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		color: #000;
		margin-top: 0px;
	}
	.memeImg {
		margin-top: 10px;
		border-radius: 10px;
		width: 70%;
		height: 70%;
		object-fit: contain;
	}
	.textInput {
		margin-top: 10px;
		border-radius: 10px;

		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		color: #000;
		margin-top: 0px;
		/*center text*/
		text-align: center;
	}
	.generateButton {
		margin-top: 10px;
		border-radius: 10px;
		background-color: #000;
		color: #fff;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		padding: 10px;
		cursor: pointer;
		transition: 0.5s;
	}
	.generateButton:hover {
		background-color: #fff;
		color: #000;
	}
	.backButton {
		color: red;
		font-size: 30px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		padding: 10px;
		cursor: pointer;
		transition: 0.5s;
		position: absolute;
		top: 10px;
		left: 10px;
		border: none;
		background-color: transparent;
		transition: 0.5s;
	}
	.backButton:hover {
		color: #000;
		transform: scale(1.1);
	}
</style>
