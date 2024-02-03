import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Client port
    port: 3000,
    proxy: {
      '/cards': {
        // Server port
        target: 'http://localhost:5160',
        changeOrigin: true,
        secure: false,
        ws: true,
        onProxyReq: (proxyReq, req, _res) => {
          console.log('Sending request to the target:', req.method, req.url);
        },
        onProxyRes: (proxyRes, req, _res) => {
          console.log('Received response from the target:', proxyRes.statusCode, req.url);
        },
        onError: (err, _req, _res) => {
          console.error('Proxy error:', err);
        },
      },
    },
  },
});