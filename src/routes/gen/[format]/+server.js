export async function GET({ params, url }) {
	var img = await fetch(
		`http://localhost:3000/gen/${params.format}?input=${url.searchParams.get('input')}`
	);
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
