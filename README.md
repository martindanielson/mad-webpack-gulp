mad-webpack-gulp
================

Small boilerplate/bootstrap for webpack with gulp and live reload via webpack-dev-server.

- Initially I will use this repository to learn a little bit more about configuration and build automation using webpack and gulp.
- The plan is to later fork this and create what I would concider the ultimate setup for a single page application (React, Flux or Backbone, some router, SASS or LESS and the usual compression and mappings).

Feel free to use this however you want, if you see something that is wrong or have suggestions send me a message and share your findings.

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