export async function load() {
	var formats = await fetch('http://localhost:3000/formats').then((res) => res.json());
	console.log(formats);
	return {
		formats
	};
}
