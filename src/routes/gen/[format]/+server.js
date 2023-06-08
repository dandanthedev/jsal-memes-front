export async function GET({ params, url }) {
	var img = await fetch(
		`https://jsal-api.daanschenkel.nlgen/${params.format}?input=${url.searchParams.get('input')}`
	);
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
