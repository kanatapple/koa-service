module.exports = {
    entry: './src/server.js',
    output: {
        filename: './docs/webpack.sw.js'
    },
    target: 'web',
    node: {
        fs: 'empty',
        net: 'empty'
    },
    module: {
        rules: [
            { test: /\.json$/, loader: 'json-loader' },
        ]
    }
};
