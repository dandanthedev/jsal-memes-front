import fs from 'fs';
import rootPathLib from 'app-root-path';
const { resolve } = rootPathLib;
import { json } from '@sveltejs/kit';
export function GET({ params }) {
	const data = fs.readFileSync(resolve(`/static/formats/${params.format}.json`), 'utf8');
	const format = JSON.parse(data);
	return json({ format });
}
