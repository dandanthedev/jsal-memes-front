import { dev } from '$app/environment';
export async function load({ url }) {
	if (dev) var url = `http://localhost:3000/formats`;
	else var url = `https://jsal-api.daanschenkel.nl/formats`;
	var formats = await fetch(url).then((res) => res.json());
	/*pagination per 10*/
	formats = formats.slice(0, 10);

	return {
		formats
	};
}
