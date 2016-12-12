'use strict';

require('./patch');

const app = require('./app');
const setupServiceWorkerServer = require('./service-worker');
const cacheName = 'koa-service-v1';
const cacheResources = [
    './',
    './bootstrap.min.css'
];

setupServiceWorkerServer(app, cacheName, cacheResources);
