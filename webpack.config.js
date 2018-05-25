const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/components/index.jsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'transferEstimate.bundle.js',
		publicPath: '/'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [
					'style-loader', // style-loader/url
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{from: path.resolve(__dirname, 'assets'), to:''}
		], {})
	]
};