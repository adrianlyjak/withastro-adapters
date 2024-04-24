import * as assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { astroCli, wranglerCli } from './_test-utils.js';

const root = new URL('./fixtures/wasm/', import.meta.url);

describe('WasmImport', () => {
	let wrangler;
	before(async () => {
		await astroCli(fileURLToPath(root), 'build');

		wrangler = wranglerCli(fileURLToPath(root));
		await new Promise((resolve) => {
			wrangler.stdout.on('data', (data) => {
				// console.log('[stdout]', data.toString());
				if (data.toString().includes('http://127.0.0.1:8788')) resolve();
			});
			wrangler.stderr.on('data', (data) => {
				// console.log('[stderr]', data.toString());
			});
		});
	});

	after((done) => {
		wrangler.kill();
	});

	it('can render', async () => {
		const res = await fetch('http://127.0.0.1:8788/add/40/2');
		assert.equal(res.status, 200);
		const json = await res.json();
		assert.deepEqual(json, { answer: 42 });
	});

	it('can render static', async () => {
		const res = await fetch('http://127.0.0.1:8788/hybrid');
		assert.equal(res.status, 200);
		const json = await res.json();
		assert.deepEqual(json, { answer: 21 });
	});
});
