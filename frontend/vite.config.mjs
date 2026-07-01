import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/LocosxFerro/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'passes-beverly-broadcast-holes.trycloudflare.com',  //poner la url sin el 'https://' del tunel del front 
    ],
  },
});