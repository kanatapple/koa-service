const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: './dist',
        libraryTarget: 'commonjs2'
    },
    target: 'web',
    resolve: {
        moduleDirectories: ['./node_modules'],
        extensions: ['.js']
    }
};

