mad-webpack-gulp
================

Small boilerplate/bootstrap for webpack with gulp and live reload via webpack-dev-server

Playbook
--------

Create a `package.json` and install Node.js dependencies
```
npm init
npm install --save-dev webpack, webpack-dev-server, gulp, gulp-util
```

Edit `webpack.config.js`
```
module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
		'./src/app'],
	...
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	...
};
```

Create a gulpfile.js

```
gulp.task("build-dev", ["webpack:build-dev"], function() {
	gulp.watch(["./src/**/*"], ["webpack:build-dev"]);
});

gulp.task("webpack-dev-server", function(callback) {
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	new WebpackDevServer(webpack(myConfig), {
		publicPath: "/" + myConfig.output.publicPath,
		hot: true,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});
```