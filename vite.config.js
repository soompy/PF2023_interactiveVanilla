import path from 'path';

export default {
  root: "src",
  resolve: {
    alias: {
      "@scripts": path.resolve(__dirname, "./src/javascript"),      
      "@styles": path.resolve(__dirname, "./src/style"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@": path.resolve(__dirname, "./"),
      "~": path.resolve(__dirname, "./"),
    },
  },
  plugins: [],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
};
