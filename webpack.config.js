var webpack = require('webpack');
module.exports = {
    entry: './entry',
    output: {
        path: './dist/',
        filename: 'dist.js'
    },
    devtool: 'source-map',
    node: {
        // ensure we leverage YuzuJS's setImmediate instead of the webpack default
        // as the default one relies on setTimeout which can introduce performance issues
        // https://github.com/yahoo/fluxible/issues/250
        setImmediate: false
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: require.resolve('babel-loader') },
            { test: /\.json$/, loader: require.resolve('json-loader') }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: 2
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
