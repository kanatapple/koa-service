'use strict';

const http = require('http');

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
        const responseOptions = {
            status: 200,
            headers: {
                'Content-Type': 'text/html'
            }
        };
        event.respondWith(new Response('<h1>test</h1>', responseOptions));
        /*
        event.respondWith(new Promise((resolve) => {
            const req = {
                url: event.request.url,
                method: event.request.method,
                socket: {}
            };
            const res = {
                end(body) {
                    resolve(new Response(body));
                },
                setHeader() {
                }
            };
            
            handleRequest(req, res);
        }));
        */
    });
}

module.exports = setupServiceWorkerServer;
