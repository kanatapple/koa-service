'use strict';

const url = require('url');

function setupServiceWorkerServer(app, cacheName, cacheResources) {
    /**
     * Install Event
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
     * Activate Event
     */
    self.addEventListener('activate', (event) => {
        console.log('ServiceWorker activated');
        
        event.waitUntil(self.clients.claim());
    });
    
    /**
     *
     */
    self.addEventListener('fetch', (event) => {
        // css request
        if (/\.css$/.test(event.request.url)) {
            event.respondWith(caches.match(event.request)
                                    .then((response) => {
                                        if (response) {
                                            return response;
                                        }
                                    }));
            return;
        }
    
        // other request
        event.respondWith(new Promise((resolve) => {
            const parsedUrl = url.parse(event.request.url);
            const splitedPath = parsedUrl.pathname.split('/');
            
            /**
             * Dummy IncomingMessage
             */
            const req = {
                url: `./${splitedPath[splitedPath.length - 1]}`, // Make relative url
                method: event.request.method,
                socket: {}
            };
    
            /**
             * Dummy ServerResponse
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
