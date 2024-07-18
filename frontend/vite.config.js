import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//http://localhost:5057
//https://apimediator.mimamsalabs.com
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const config = {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://apimediator.mimamsalabs.com',
          changeOrigin: true
        }
      }
    }
  };
  return defineConfig(config);
};