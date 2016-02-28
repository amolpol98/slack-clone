module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				/*resolveLoader: { root: path.join(__dirname, "node_modules") },*/
				loader: 'babel-loader',
				exclude: /node-modules/
			}
		]
	}
}