'use strict';

const app = require('koa')();
const route = require('koa-route');

function buildHtml(header, link1, linkText1, link2, linkText2) {
    return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>Koa Service</title>
    <link rel="stylesheet" href="./bootstrap.min.css">
</head>
<body>
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <h1 class="navbar-brand">${header}</h1>
            </div>
        </div>
    </nav>
    <div class="container-fluid">
        <a class="btn btn-info" role="button" href="${link1}">${linkText1}</a>
        <a class="btn btn-info" role="button" href="${link2}">${linkText2}</a>
    </div>
</body>
</html>
`;
}

app.use(route.get('./', function* () {
    this.body = buildHtml('Index Page', './about', 'To About', './help', 'To Help');
}));

app.use(route.get('./about', function* () {
    this.body = buildHtml('About Page', './', 'To Index', './help', 'To Help');
}));

app.use(route.get('./help', function* () {
    this.body = buildHtml('Help Page', './', 'To Index', './about', 'To About');
}));

// app.listen(3000);

module.exports = app;