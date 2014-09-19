mad-webpack-gulp
================

Small boilerplate/bootstrap for webpack with gulp and live reload via webpack-dev-server.

> Initially I will use this repository to learn a little bit more about configuration and build automation using webpack and gulp.
> The plan is to later fork this and create what I would concider the ultimate setup for a single page application (React, Flux or Backbone, some router, SASS or LESS and the usual compression and mappings).

Feel free to use this however you want, if you see something that is wrong or have suggestions send me a message and share your findings.

Recent changes
--------------
  - Attempted to add support for css bundles, but since they do not (yet) work with hot module replacement I saved the changes in separate files for use in production environments. \*
  - Added support for styles, with hot module replacement. \*
  - Changed the default entry to be easily duplicated for additional application modules.

> \* The problem having stylesheets without bundles is that they get compiled into JavaScript; thus, we loose the ability to trace styles for elements in DevTools.  
>  
> [sokra](http://github.com/sokra):  
> It's planned to add hot update support for the css bundle.  
> That's not so complex...

Next up & thoughts
------------------

  - Follow up hot module replacement for css bundles.
  - Look into a way to use the same html file (index.html) for all entries.
  - Add React
  - Add support for different environments

Rant about structure
--------------------

I, much like the rest of the Internet, have not really settled with a good structure for the project. Currently I have put all the source code that will be built under `src` (others use "js", "app"). The reason I chose "src" is simply because I forsee that I might use CoffeeScript or any other preprocessor for the JavaScript code and I want the folder to reflect its contents, not what is being built. When I build the application I use put the artifacts in the `js` folder (others use "assets", "dist", "scripts", "build").

The main entry for the application is `src/app.js` (others use "index.js", "main.js") and this is built into `js/[entry]-bundle.js` (others use "bundle.js", "app.js").

> All of this is something I think about constantly when building different applications. I want something that is small, to the point and is recognizeable by other developers. Unfortunatelly there is no real consensus within the industry. The only "standards" regarding structure comes from individual frameworks and they are tightly coupled with the framework and not really generic and flexible (which is what I aim for).

Playbook
--------

Create a `package.json` and install Node.js dependencies
```
npm init
npm install --save-dev webpack, webpack-dev-server, gulp, gulp-util
npm install --save-dev style-loader, css-loader
npm install --save-dev extract-text-webpack-plugin
```

Edit `webpack.config.js`
```
module.exports = {
	entry: {
		main: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', './src/app']
	},
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
