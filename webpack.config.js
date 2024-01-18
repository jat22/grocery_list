const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			}
		]
	},
	plugins : [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	],
	output: {
		clean: true
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		open: true
	}
};