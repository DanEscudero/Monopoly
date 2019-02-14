module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off',
		'no-debugger': 'warn',
		'no-lone-blocks': 'error',
		'space-before-function-paren': ['error', 'always'],
		'max-len': ['error', { code: 120 }]
	}
};
