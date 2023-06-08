export async function load() {
	var formats = await fetch('https://jsal-api.daanschenkel.nl/formats').then((res) => res.json());
	console.log(formats);
	return {
		formats
	};
}
