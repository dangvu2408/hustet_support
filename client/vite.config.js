// vite.config.js
import { webcrypto } from 'crypto';
globalThis.crypto = webcrypto;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()]
});
