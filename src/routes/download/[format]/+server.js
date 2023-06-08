export async function GET({ params, url }) {
	var img = await fetch(
		`https://jsal-api.daanschenkel.nl/gen/${params.format}?input=${url.searchParams.get('input')}`
	);
	//download immediately
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png',
			'Content-Disposition': `attachment; filename=${params.format}.png`
		}
	});
}
