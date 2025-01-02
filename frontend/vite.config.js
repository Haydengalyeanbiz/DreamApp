import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig((mode) => ({
	plugins: [react()],
	server: {
		open: true,
		proxy: {
			'/api': 'http://127.0.0.1:5000',
		},
	},
}));
