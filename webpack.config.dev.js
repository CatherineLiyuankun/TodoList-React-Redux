/*
 * Webpack development configuration
 */

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    devtool: 'source-map',

    entry: {
        app: [
            'webpack-hot-middleware/client',
            './src/app'
        ],
        vendors: ['react', 'react-dom', 'react-router']
    },

    output: {
        filename: '[name].js',
        publicPath: '/static/'
    },

    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            include: [
                path.resolve(__dirname, 'src'),
            ],
            exclude: /node_modules/,
            loaders: ['react-hot-loader', 'babel-loader']
        },{
            test: /\.(sass|scss)/,
            include: [
                path.resolve(__dirname, 'src'),
            ],
            loaders: 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true'
        }, {
            test: /\.css?$/,
            loaders: ['style-loader', 'raw-loader'],
            include: __dirname
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __DEV__: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
