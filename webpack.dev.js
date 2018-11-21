/* eslint-disable */

const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common('development'), {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        compress: false,
        host: 'localhost',
        port: 4000,
        https: false,
        overlay: {
            warnings: false,
            errors: true
        }
    }
});
