import { dev } from '$app/environment';
export async function load() {
	if (dev) var url = `http://localhost:3000/formats`;
	else var url = `https://jsal-api.daanschenkel.nl/formats`;
	var formats = await fetch(url).then((res) => res.json());
	return {
		formats
	};
}
