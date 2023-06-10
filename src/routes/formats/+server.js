import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
export async function GET({ url }) {
	var page = url.searchParams.get('page');

	if (dev) var url = `http://localhost:3000/formats`;
	else var url = `https://jsal-api.daanschenkel.nl/formats`;
	var formats = await fetch(url).then((res) => res.json());
	/*pagination per 10*/
	if (page) {
		var start = (page - 1) * 10;
		var end = start + 10;
		formats = formats.slice(start, end);
	} else {
		formats = formats.slice(0, 10);
	}
	var isMore = formats.length === 10;

	return json({
		formats,
		isMore
	});
}
