/* eslint-disable */

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common('production'), {
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		})
	]
});
