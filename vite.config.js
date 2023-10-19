import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    root:'./src',
    build: {
        outDir: '../build',
        rollupOptions: {
            input:{
                main:'./src/index.html',
                battle:'./src/pages/battle.html',
                cardSelector:'./src/pages/cardSelector.html',
                deck:'./src/pages/deck.html',
                gameview: './src/pages/gameView.html',
                general: './src/pages/general.html',
                navbar: './src/layouts/navbar.html',
                inGameLayout:'./src/layouts/inGameLayout.html',
                chatItem:'./src/templates/chatItem.html',
                chatListItem:'./src/templates/chatListItem.html',
                chatTemplate:'./src/templates/chatTemplate.html',
                chatPartyListItem:'./src/templates/partyListItem.html',
                waitingRoomPlayer:'./src/templates/waitingRoomPlayer.html',
                modalGeneral:'./src/components/modalGeneral/modal.html'
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