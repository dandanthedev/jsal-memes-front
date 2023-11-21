import fs from 'fs';
import { json } from '@sveltejs/kit';
export function GET({ params }) {
	const data = fs.readFileSync(`./static/formats/${params.format}.json`, 'utf8');
	const format = JSON.parse(data);
	return json({ format });
}
