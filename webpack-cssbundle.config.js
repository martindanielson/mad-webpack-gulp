var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		main: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', './src/app']
	},
	output: {
		path: path.join(__dirname, 'js'),
		filename: '[name]-bundle.js',
		publicPath: 'js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('[name]-style.css')
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		//modulesDirectories: ['node_modules']
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
			{ test: /\.jsx$/, loader: 'jsx' }
		]
	},
	externals: {
		'showdown': 'window.Showdown'
	}
};