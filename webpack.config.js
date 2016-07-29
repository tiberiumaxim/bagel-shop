/**
 * Created by tiberiu on 27/07/16.
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: './build',
		publicPath: '/',
		filename: 'js/bundle.js'
	},
	devtool: 'source-map',
	// devServer: {
	// 	historyApiFallback: true
	// },
	// hot: true,
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
				plugins: ['transform-object-rest-spread']
			}
		}, {
			test: /\.scss$|\.css$/,
			loader: ExtractTextPlugin.extract({
				fallbackLoader: 'style',
				loader: 'css?sourceMap!postcss-loader!sass?sourceMap'
			})
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
			loader: 'file-loader'
		}, {
			test: /\.png$/,
			loader: 'url-loader?limit=100000'
		}, {
			test: /\.jpg$/,
			loader: 'file-loader'
		}, {
			test: /\.gif/,
			loader: 'file-loader'
		}, {
			test: /\.html$/,
			loader: 'raw-loader'
		}]
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: './src/index.html'
		}, {
			from: './src/img',
			to: 'img'
		}]),

		new ExtractTextPlugin('style/bundle.css'),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		})
	],

	postcss: function () {
		return [precss, autoprefixer];
	}
};
