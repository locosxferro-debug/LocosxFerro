import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'locosxferro-1.onrender.com',  //poner la url sin el 'https://' del tunel del front 
    ],
  },
});