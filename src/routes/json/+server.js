import fs from 'fs';
import { json } from '@sveltejs/kit';
export function GET({ url }) {
	var formats = [];
	const page = url.searchParams.get('page') || 1;
	fs.readdirSync('./static/formats').forEach((file) => {
		if (file.split('.')[1] !== 'json') return;

		const format = fs.readFileSync(`./static/formats/${file}`, 'utf8');
		const formatJson = JSON.parse(format);
		formats.push({
			id: file.split('.')[0],
			...formatJson
		});

		if (formats.length >= 10) return;
	});

	formats = formats.slice((page - 1) * 10, page * 10);

	return json({
		formats,
		nextPage: formats.length >= 10 ? parseInt(page) + 1 : null
	});
}
