import { dev } from '$app/environment';
export async function load({ params }) {
	if (dev) var url = `http://localhost:3000`;
	else var url = `https://jsal-api.daanschenkel.nl`;
	var format = await fetch(`${url}/format/${params.format}`).then((res) => res.json());
	return {
		format
	};
}
