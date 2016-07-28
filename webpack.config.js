/**
 * Created by tiberiu on 27/07/16.
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: './build',
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
			test: /\.(otf|eot|svg|ttf|woff)/,
			loader: 'url-loader?limit=8192&name=assets/fonts/[name].[ext]'
		}, {
			test: /\.png$/,
			loader: 'url-loader?limit=100000'
		}, {
			test: /\.jpg$/,
			loader: 'file-loader'
		}, {
			test: /\.gif/,
			loader: 'file-loader'
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
	],

	postcss: function () {
		return [precss, autoprefixer];
	}
};
