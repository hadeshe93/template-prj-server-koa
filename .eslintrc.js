module.exports = {
	parserOptions: { ecmaVersion: 2017, sourceType: 'module' },
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['prettier'],
	rules: { 'prettier/prettier': ['error'] },
	env: { es6: true, browser: false, node: true, mocha: false, jest: false },
	parser: 'babel-eslint',
};
