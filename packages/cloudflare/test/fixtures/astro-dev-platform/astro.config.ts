import cloudflare from '@chatmeter/astro-cloudflare';
import { defineConfig } from 'astro/config';

export default defineConfig({
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	output: 'server',
});
