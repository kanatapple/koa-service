'use strict';

if (navigator.serviceWorker) {
    // navigator.serviceWorker.register('./sw.js', {scope: './'})
    navigator.serviceWorker.register('./webpack.sw.js', {scope: './'})
             .then(() => {
                 location.reload();
             })
             .catch(console.error.bind(console));
}