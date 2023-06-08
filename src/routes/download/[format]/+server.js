import { dev } from '$app/environment';

export async function GET({ params, url }) {
	if (dev) var url = `http://localhost:3000/formats`;
	else var url = `https://jsal-api.daanschenkel.nl/formats`;
	var img = await fetch(`${url}/gen/${params.format}?input=${url.searchParams.get('input')}`);
	//download immediately
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png',
			'Content-Disposition': `attachment; filename=${params.format}.png`
		}
	});
}
