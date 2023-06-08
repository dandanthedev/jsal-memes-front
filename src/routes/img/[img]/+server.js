import { dev } from '$app/environment';

export async function GET({ params }) {
	var img = await fetch(
		`${dev ? 'http://localhost:3000' : 'https://jsal-api.daanschenkel.nl'}/img/${params.img}`
	);
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
