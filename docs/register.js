'use strict';

if (navigator.serviceWorker) {
    const controllerChange = new Promise((resolve) => {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            resolve(navigator.serviceWorker.controller);
        });
    });
    
    navigator.serviceWorker.register('./sw.js', {scope: './'})
             .then(() => {
                 return navigator.serviceWorker.ready;
             })
             .then(() => {
                 if (navigator.serviceWorker.controller) {
                     return navigator.serviceWorker.controller;
                 }
                 return controllerChange;
             })
             .then(() => {
                 location.reload();
             })
             .catch(console.error.bind(console));
}
