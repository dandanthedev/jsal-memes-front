import { dev } from '$app/environment';
export async function GET({ params, url }) {
	var img = await fetch(
		`${dev ? 'http://localhost:3000' : 'https://jsal-api.daanschenkel.nl'}/gen/${
			params.format
		}?input=${url.searchParams.get('input')}`
	);
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
