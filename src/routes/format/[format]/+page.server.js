export async function load({ params }) {
	var format = await fetch(`http://localhost:3000/format/${params.format}`).then((res) =>
		res.json()
	);
	return {
		format
	};
}
