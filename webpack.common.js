/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (MODE = 'production') => {
	return {
		mode: MODE,
		entry: {
			app: './src/index.js',
			style: './src/index.scss'
		},
		plugins: [
			new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
				title: 'Fractal Tree',
				inject: false,
				template: require('html-webpack-template'),
				devServer: MODE == 'development' ? 'http://localhost:4000' : undefined,
				minify: true,
				lang: 'en-GB',
				appMountId: 'root'
			}),
			new webpack.DefinePlugin({
				'ENVIRONMENT': JSON.stringify(MODE)
			})
		],
		output: {
			filename: '[name].[hash].bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		},
		resolve: {
			extensions: ['.js'],
			modules: ['node_modules'],
		},
		module: {
			rules: [{
				type: 'javascript/auto',
				test: /\.(json|html)/,
				exclude: /node_modules/,
				use: ['file-loader'],
			}, {
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}, {
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}]
		}
	}
};
