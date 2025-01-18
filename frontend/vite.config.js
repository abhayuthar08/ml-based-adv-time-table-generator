// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     proxy: {
// //       // Proxy API requests to the backend Express server running on port 5000
// //       '/api': {
// //         target: 'http://localhost:5000',  // Backend server
// //         changeOrigin: true,               // Ensure the Origin header is adjusted
// //         secure: false,                    // Allow non-HTTPS requests if necessary
// //         rewrite: (path) => path.replace(/^\/api/, '') // Optionally remove the '/api' prefix
// //       },
// //     }
// //   },
// //   build: {
// //     outDir: 'dist',  // Specify the output directory for production build
// //   }
// // })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy API requests to the backend Express server running on port 5000
//       '/api': {
//         target: 'http://localhost:5000',  // Backend server
//         changeOrigin: true,               // Ensure the Origin header is adjusted
//         secure: false,                    // Allow non-HTTPS requests if necessary
//         rewrite: (path) => path.replace(/^\/api/, '') // Optionally remove the '/api' prefix
//       },
//     }
//   },
//   build: {  
//     outDir: 'dist',  // Specify the output directory for production build
//   }
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend Express server running on port 5000
      '/api': {
        target: 'http://localhost:5000',  // Backend server
        changeOrigin: true,               // Ensure the Origin header is adjusted
        secure: false,                    // Allow non-HTTPS requests if necessary
        rewrite: (path) => path.replace(/^\/api/, '') // Optionally remove the '/api' prefix
      },
    }
  },
  build: {
    outDir: 'dist',  // Specify the output directory for production build
  }
})
