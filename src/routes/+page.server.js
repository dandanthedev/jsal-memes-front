import { dev } from '$app/environment';
export async function load({ url }) {
	if (dev) var url = `http://localhost:3000/formats`;
	else var url = `https://jsal-api.daanschenkel.nl/formats`;
	var formats = await fetch(`${url}?page=1`).then((res) => res.json());

	return {
		formats: formats.formats
	};
}
