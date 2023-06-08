export async function GET({ params }) {
	var img = await fetch(`https://jsal-api.daanschenkel.nl/img/${params.img}`);
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
