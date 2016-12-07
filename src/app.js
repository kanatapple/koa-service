'use strict';

const app = require('koa')();
const route = require('koa-route');

app.use(route.get('/', function* () {
    this.body = `
<h1>Index Page</h1>
<a href="/about">To About</a>
<a href="/help">To Help</a>
`;
}));

app.use(route.get('/about', function* () {
    this.body = `
<h1>About Page</h1>
<a href="/">To Index</a>
<a href="/help">To Help</a>
`;
}));

app.use(route.get('/help', function* () {
    this.body = `
<h1>Help Page</h1>
<a href="/">To Index</a>
<a href="/about">To About</a>
`;
}));

app.listen(3000);
