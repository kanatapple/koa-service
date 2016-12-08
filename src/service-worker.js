'use strict';

function setupServiceWorkerServer(app, cacheName, cacheResources) {
    /**
     *
     */
    self.addEventListener('install', (event) => {
        console.log('ServiceWorker installed');
        
        event.waitUntil(
            Promise.all([
                caches.open(cacheName).then((cache) => cache.addAll(cacheResources)),
                self.skipWaiting()
            ])
        );
    });
    
    /**
     *
     */
    self.addEventListener('activate', (event) => {
        console.log('ServiceWorker activated');
        
        event.waitUntil(self.clients.claim());
    });
    
    const handleRequest = app.callback();
    
    /**
     *
     */
    self.addEventListener('fetch', (event) => {
        event.respondWith(new Response('hello'));
    });
}

module.exports = setupServiceWorkerServer;
