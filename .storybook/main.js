module.exports = {
	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.
		console.log('config->>>', config);
		config.module.rules.push({
			test: /\.(svg)(\?.*)?$/,
			loader: 'file-loader',
			query: { name: '/static/media/[name].[hash:8].[ext]' }
		});

		// Make whatever fine-grained changes you need

		// Return the altered config
		return config;
	},
	stories: [ '../src/**/*.stories.js' ],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-knobs/register'
	]
};
