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
