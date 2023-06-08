export async function GET({ params }) {
	var img = await fetch(`http://localhost:3000/img/${params.img}`);
	return new Response(img.body, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
