export async function load() {
	var formats = await fetch('https://jsal-api.daanschenkel.nlformats').then((res) => res.json());
	console.log(formats);
	return {
		formats
	};
}
