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
	testRegex: ".*\\.test\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	collectCoverageFrom: [
		"**/*.(t|j)s"
	],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
	preset: 'ts-jest',
};