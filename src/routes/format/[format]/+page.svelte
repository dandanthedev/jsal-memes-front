<script>
	import { goto } from '$app/navigation';
	import 'jimp/browser/lib/jimp.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const { Jimp } = window;

	let format;
	let imgSrc;
	let jimpCache = {};
	let loading = false;
	onMount(async () => {
		await fetch(`/format/${$page.params.format}/json`)
			.then((res) => res.json())
			.then(async (res) => {
				format = res.format;
				imgSrc = format.img;
				jimpCache.img = await Jimp.read(format.img);
				imgSrc = await jimpCache.img.getBase64Async(Jimp.MIME_PNG);
				if (format.font) {
					if (Jimp[format.font])
						jimpCache.font = await Jimp.loadFont(Jimp[format.font]).then((font) => {
							return font;
						});
					else {
						//get file buffer

						jimpCache.font = await Jimp.loadFont(`/fonts${format.font}`).then((font) => {
							return font;
						});
					}
				} else
					jimpCache.font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
						return font;
					});

				jimpCache.watermarkFont = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then((font) => {
					return font;
				});
			});
	});

	async function generate(download) {
		loading = true;

		let img = jimpCache.img.clone();
		//add text

		format.text.forEach((t) => {
			//print in center
			img.print(
				jimpCache.font,
				t.x,
				t.y,
				{
					text: t.text || '',
					alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
					alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
				},
				t.maxWidth,
				t.maxHeight
			);
		});

		//print watermark on bottom right
		img.print(jimpCache.watermarkFont, 10, 10, 'jsamemes');

		//set imagesource
		imgSrc = await img.getBase64Async(Jimp.MIME_PNG);

		if (download) {
			const a = document.createElement('a');
			a.href = imgSrc;
			a.download = 'meme.png';
			a.click();
		}

		loading = false;
	}
</script>

<div class="main">
	<button on:click={() => goto('/')} class="backButton">x</button>
	<h1 class="title">JackSucksAtMemes</h1>

	{#if !format}
		<div class="loading">Loading...</div>
	{:else}
		<h2 class="formatTitle">{format.friendlyName}</h2>
		<img
			alt={format.friendlyName}
			src={imgSrc}
			class="memeImg"
			style={loading ? 'filter: blur(10px)' : ''}
		/>
		{#each format.text as text, i}
			<input
				type="text"
				placeholder="Text"
				on:input={(e) => {
					format.text[i].text = e.target.value;
					let temp = e.target.value;

					setTimeout(() => {
						if (temp == e.target.value) generate(false);
					}, 500);
				}}
				class="textInput"
			/>
		{/each}
		<button
			class="generateButton"
			on:click={() => {
				generate(true);
			}}>Download</button
		>
	{/if}
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
		/*transition when filter is applied*/
		transition: 0.5s;
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
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
