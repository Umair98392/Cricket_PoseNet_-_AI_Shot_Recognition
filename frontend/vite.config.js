import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/lol':'https://sturgeon-light-especially.ngrok-free.app/predict';
  //   },
  // },
  plugins: [react()],
})
