import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'locosxferro-debug.github.io/LocosxFerro',  //poner la url sin el 'https://' del tunel del front 
    ],
  },
});