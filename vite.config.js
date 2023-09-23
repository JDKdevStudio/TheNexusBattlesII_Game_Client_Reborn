import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    root:'./src',
    build: {
        outDir: '../build',
        rollupOptions: {
            input:{
                main:'./src/index.html',
                example:'./src/pages/example.html'
            },
        },
    },
    resolve: {
        alias: {
            '~bootstrap': './node_modules/bootstrap',
        }
    },
});