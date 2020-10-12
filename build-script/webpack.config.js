const path = require('path');
console.log(__dirname)
module.exports = {
	entry: {
		main:path.resolve(__dirname, '../src/index.ts'),
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, '../dist'),
		libraryTarget: "umd",
    },
    externals: {
		path: 'path',
		
	},
	
	resolve: { // 路径别名
		extensions:['.ts','.js'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
		}
	},

	module:{
		rules: [
			{
				test: /\.ts?/,
				exclude: /node_modules/,
				loader: ["babel-loader","ts-loader"],
			}
		]
	}
};