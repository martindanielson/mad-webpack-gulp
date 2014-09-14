var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
		'./src/app'],
	output: {
		path: path.join(__dirname, 'js'),
		filename: 'bundle.js',
		publicPath: 'js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		//modulesDirectories: ['node_modules']
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.jsx$/, loader: 'jsx' },
		]
	},
	externals: {
		'showdown': 'window.Showdown'
	}
};