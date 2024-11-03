import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: {
			globals: { module: 'readonly' },
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	configPrettier, // Disable ESLint rules that may conflict with Prettier
	{
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			quotes: ['error', 'single'], // Use single quotes for strings
			indent: ['error', 'tab'],
			'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	},
];
