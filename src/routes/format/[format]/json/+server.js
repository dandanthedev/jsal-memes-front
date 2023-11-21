import fs from 'fs';
import { resolve as reqlib } from 'app-root-path';

import { json } from '@sveltejs/kit';
export function GET({ params }) {
	const data = fs.readFileSync(reqlib(`/static/formats/${params.format}.json`), 'utf8');
	const format = JSON.parse(data);
	return json({ format });
}
