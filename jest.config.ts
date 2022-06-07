import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>',
	}),
	moduleFileExtensions: [
		"js",
		"json",
		"ts"
	],
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	collectCoverageFrom: [
		'<rootDir>/modules/**/*.ts',
		'!<rootDir>/modules/**/infra/*.ts',
		'!**/index.ts',
		'!<rootDir>/modules/**/infra/**/*.ts',
		'!<rootDir>/modules/**/domain/tests/mock/**/*.ts',
		'!<rootDir>/modules/**/app/use-cases/**/*.dto.ts',
		'!**/test/**',
	],
	coverageDirectory: '../coverage',
	testEnvironment: "node",
	preset: 'ts-jest',
};