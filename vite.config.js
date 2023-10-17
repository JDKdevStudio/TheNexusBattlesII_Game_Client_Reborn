import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    root:'./src',
    build: {
        outDir: '../build',
        rollupOptions: {
            input:{
                main:'./src/index.html',
                general: './src/pages/general.html',
                navbar: './src/layouts/navbar.html',
                gameview: './src/pages/gameView.html'
            },
        },
    },
    resolve: {
        alias: {
            '~bootstrap': './node_modules/bootstrap',
        }
    },
    optimizeDeps:{
        include:["src/**"]
    },
});