/*
 * Webpack production configuration
 */

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map',

    entry: {
        app: ['./src/app'],
        vendors: ['react', 'react-dom', 'react-router']
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },

    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            include: [
                path.resolve(__dirname, 'src'),
            ],
            exclude: /node_modules/,
            loaders: ['babel-loader']
        },{
            test: /\.(sass|scss)/,
            include: [
                path.resolve(__dirname, 'src'),
            ],
            loaders: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __DEV__: false,
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
            }
        }),
        new webpack.LoaderOptionsPlugin({
            option: {
                postcss: [
                    cssnano({
                        sourcemap: true,
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 version', 'Chrome 31', 'Safari 8'],
                            discardComments: {
                                removeAll: true
                            }
                        }
                    })
                ]
            }
        })
    ]
};