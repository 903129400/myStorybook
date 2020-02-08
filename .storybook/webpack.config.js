// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
// 	module: {
// 		rules: [
// 			// {
// 			// 	test: /\.css$/,
// 			// 	exclude: /(node_modules|src\/index.css)/,
// 			// 	use: [
// 			// 		{
// 			// 			loader: 'style-loader'
// 			// 		},
// 			// 		{
// 			// 			loader: 'css-loader',
// 			// 			options: {
// 			// 				// 以前版本是通过 true 开启，相关配置接着写
// 			// 				// modules: true
// 			// 				// localIdentName: '[name]__[local]--[hash:base64:5]'
// 			// 				// 现在是给 modules 一个 options 对象开启
// 			// 				modules: {
// 			// 					// 重新生成的 css 类名
// 			// 					localIdentName: '[path]___[name]__[local]___[hash:base64:5]!resolve-url!postcss'
// 			// 				}
// 			// 			}
// 			// 		}
// 			// 	]
// 			// },
// 			// {
// 			// 	test: /\.js$/,
// 			// 	exclude: /node_modules/,
// 			// 	use: {
// 			// 		loader: 'babel-loader',
// 			// 		options: {
// 			// 			presets: [ '@babel/react', '@babel/preset-env' ],
// 			// 			plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
// 			// 		}
// 			// 	}
// 			// },
// 			{
// 				test: /\.(woff|woff2|eot|ttf|otf)$/,
// 				loader: 'url-loader'
// 			},
// 			{
// 				test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
// 				loader: 'url-loader',
// 				query: {
// 					limit: 10000
// 				}
// 			}

// 			// {
// 			// 	test: /\.css$/,
// 			// 	//exclude: /(node_modules|antd\.css|src\/index)/, // 支持本地文件的 css-modules 功能，避免和 antd 冲突
// 			// 	use: [
// 			// 		{
// 			// 			loader: 'style-loader'
// 			// 		},
// 			// 		{
// 			// 			loader: 'css-loader'
// 			// 			// options: {
// 			// 			// 	// 开启 CSS Modules

// 			// 			// 	importLoaders: 1
// 			// 			// 	// 自定义生成的类名
// 			// 			// 	// modules: true,
// 			// 			// 	// localIdentName: '[name]-[local]-[hash:base64:5]'
// 			// 			// }
// 			// 		},
// 			// 		{
// 			// 			loader: 'postcss-loader'
// 			// 		}
// 			// 	]
// 			// }
// 		]
// 	}
// };
const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.less$/,
				loaders: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',

						options: {
							modifyVars: { '@primary-color': '#d8df19' },
							javascriptEnabled: true
						}
					}
				],
				include: path.resolve(__dirname, '../')
			}
		]
	}
};
