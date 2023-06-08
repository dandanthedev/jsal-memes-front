export async function load({ params }) {
	var format = await fetch(`https://jsal-api.daanschenkel.nl/format/${params.format}`).then((res) =>
		res.json()
	);
	return {
		format
	};
}
