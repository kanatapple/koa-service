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
    
    /**
     *
     */
    self.addEventListener('fetch', (event) => {
        event.respondWith(new Promise((resolve) => {
            /**
             * IncomingMessage
             */
            const req = {
                url: event.request.url,
                method: event.request.method,
                socket: {}
            };
    
            /**
             * ServerResponse
             */
            const res = {
                _headers: {},
                end(body) {
                    const options = {
                        status: this.statusCode || 200,
                        headers: this._headers
                    };
                    resolve(new Response(body, options));
                },
                setHeader(name, value) {
                    this._headers[name] = value;
                }
            };
    
            const handleRequest = app.callback();
            handleRequest(req, res);
        }));
    });
}

module.exports = setupServiceWorkerServer;
