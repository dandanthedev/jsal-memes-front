export async function load({ params }) {
	var format = await fetch(`https://jsal-api.daanschenkel.nlformat/${params.format}`).then((res) =>
		res.json()
	);
	return {
		format
	};
}
