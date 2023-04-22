const internalImportPaths = [
	//'@types/**',
	'@assets/**',
	'@common/**',
	'@components/**',
	'@context/**',
	'@forms/**',
	'@hooks/**',
	'@layouts/**',
	'@theme/**',
	'@utils/**',
	'@validation/**',
];

function generatePathGroups(internalPaths) {
	return internalPaths.map(path => ({
		pattern: path,
		group: 'internal',
	}));
}

module.exports = {
	extends: 'universe/native',
	plugins: ['import'],
	rules: {
		'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
		'import/order': [
			'warn',
			{
				groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
				pathGroups: generatePathGroups(internalImportPaths).concat([
					{
						pattern: '@(react|react-native|react-navigation)',
						group: 'external',
						position: 'before',
					},
				]),
				distinctGroup: false,
				pathGroupsExcludedImportTypes: ['internal'],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				warnOnUnassignedImports: true,
			},
		],
	},
};
