import cloudflare from '@chatmeter/astro-cloudflare';
import solidJs from "@astrojs/solid-js";
import { defineConfig } from 'astro/config';

export default defineConfig({
	integrations: [solidJs()],
	adapter: cloudflare(),
	output: 'server',
});
