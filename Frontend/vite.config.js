import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': { // Prefix all API requests with /api
//         target: 'http://localhost:4000', // Backend server
//         changeOrigin: true, // Handle CORS issues
//         rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding to the backend
//       },
//     },
//   },
// });
