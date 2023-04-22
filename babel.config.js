module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					alias: {
						//'@types': './src/@types',
						'@assets': './src/assets',
						'@common': './src/common',
						'@components': './src/components',
						'@context': './src/context',
						'@forms': './src/forms',
						'@hooks': './src/hooks',
						'@layouts': './src/layouts',
						'@theme': './src/theme',
						'@utils': './src/utils',
						'@validation': './src/validation',
					},
				},
			],
		],
	};
};
