<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { scale, fade } from 'svelte/transition';
	let data;
	let showPopup = false;
	onMount(async () => {
		await fetch(`/json`)
			.then((res) => res.json())
			.then((res) => {
				data = res;
			});
		if (!localStorage.getItem('disablePopup')) {
			showPopup = true;
		}
	});
</script>

{#if showPopup}
	<div class="modalContainer" transition:fade={{ duration: 200 }}>
		<div class="modal" transition:scale={{ duration: 200 }}>
			<h1 class="modalTitle">The JackSucksAtMemes Survey</h1>
			<p class="modalText">
				Heya! It's the end of the year, and i thought it'd be fun to make a survey about the
				JackSucks empire!
				<br />
				You can click the button below to take the survey, if you dont want to, then thats fine too!
			</p>
			<div class="modalButtons">
				<a
					href="https://forms.gle/9Tsao4VjftRaZfLj6"
					target="_blank"
					rel="noopener noreferrer"
					on:click={() => {
						localStorage.setItem('disablePopup', true);
						showPopup = false;
					}}
				>
					<button class="modalButton">Take the survey</button>
				</a>
				<button
					class="modalButton"
					on:click={() => {
						localStorage.setItem('disablePopup', true);
						showPopup = false;
					}}>No thanks</button
				>
			</div>
		</div>
	</div>
{/if}

<div class="container">
	<div class="main">
		<button
			class="title"
			on:click={() => {
				//play easteregg sound
				var audio = new Audio('/easteregg.mp3');
				audio.play();
			}}
		>
			JackSucksAtMemes
		</button>

		{#if data?.formats}
			<div class="formats">
				{#each data.formats as format}
					<button
						class="format"
						on:click={() => {
							goto(`/format/${format.id}`);
						}}
					>
						<img
							src={`/formats/${format.id}.png`}
							alt={format.friendlyName}
							width="200"
							height="200"
						/>
					</button>
				{/each}
			</div>
		{:else}
			<div class="format">
				<div class="loading">Loading...</div>
			</div>
		{/if}

		{#if data?.nextPage == null}
			<button class="more" disabled> Load More </button>
		{:else}
			<button
				class="more"
				on:click={async (e) => {
					e.target.disabled = true;
					await fetch(`/json?page=${data.nextPage}`)
						.then((res) => res.json())
						.then((newFormats) => {
							data.formats = data.formats.concat(newFormats.formats);
							data.nextPage = newFormats.nextPage;
						});
					e.target.disabled = false;
				}}
			>
				Load More
			</button>
		{/if}
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

		min-width: 80vw;
	}
	.title {
		font-size: 30px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		color: #000;
		margin-top: 0px;
		/*change color with animation*/
		animation: blink 5s infinite;

		cursor: default;
		background-color: transparent;
		border: none;
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

	.format {
		border-radius: 10px;
		border: none;
		background-color: #fff;
		padding: 10px;
		cursor: pointer;

		transition: all 0.3s ease;
	}
	.format img {
		margin: 10px;
		border-radius: 10px;
		/*dont stretch image*/
		object-fit: cover;
		pointer-events: none;
	}

	.format:hover {
		filter: brightness(0.9);
		background-color: #eee;
	}

	.more {
		margin-top: 20px;
		border-radius: 10px;
		border: none;
		background-color: #fe5292;
		color: #fff;
		padding: 10px;
		font-size: 20px;
		cursor: pointer;
		transition: 0.5s;
	}
	.more:hover {
		background-color: #ec417b;
	}
	.more:disabled {
		background-color: #ccc;
	}

	.loading {
		margin-top: 20px;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		color: #000;
	}

	/*modal*/
	.modalContainer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal {
		background-color: #fff;
		border-radius: 10px;
		padding: 20px;
	}
	.modalTitle {
		font-size: 30px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		color: #000;
		margin-top: 0px;
	}
	.modalText {
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		color: #000;
		margin-top: 0px;
	}
	.modalButtons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.modalButton {
		margin: 10px;
		border-radius: 10px;
		border: none;
		background-color: #fe5292;
		color: #fff;
		padding: 10px;
		font-size: 20px;
		cursor: pointer;
		transition: 0.5s;
	}
	.modalButton:hover {
		background-color: #ec417b;
	}
	.modalButton:disabled {
		background-color: #ccc;
	}
</style>
