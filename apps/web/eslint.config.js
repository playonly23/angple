import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import filenamesPlugin from 'eslint-plugin-filenames-simple';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        },
        rules: {
            // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
            // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
            'no-undef': 'off',
            // SvelteKit/개발 중이므로 일부 규칙 완화
            '@typescript-eslint/no-unused-vars': 'warn',
            'svelte/require-each-key': 'warn',
            'svelte/no-navigation-without-resolve': 'warn'
        }
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            }
        }
    },
    {
        files: ['**/*.svelte', '**/*.ts', '**/*.js'],
        ignores: [
            '**/+*.js', // SvelteKit 파일들 제외
            '**/+*.ts',
            '**/+*.svelte',
            '**/app.html', // 특수 SvelteKit 파일
            '**/app.css', // CSS 파일
            '**/vite.config.*', // 설정 파일들
            '**/svelte.config.*',
            '**/eslint.config.*',
            '**/playwright.config.*',
            '**/tsconfig.*'
        ],
        plugins: {
            'filenames-simple': filenamesPlugin
        },
        rules: {
            // 파일명은 kebab-case로 강제
            'filenames-simple/naming-convention': [
                'error',
                {
                    rule: 'kebab-case'
                }
            ]
        }
    }
);
