module.exports = {
  verbose: true,
  testMatch: ['**/*.(test|spec).ts'],
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  coverageReporters: ['lcov'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverageFrom: ['src/**/*.ts', '!jest.config.js', '!.eslint.js', '!**/coverage/**', '!**/node_modules/**', '!**/test/**'],
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Integgration tests',
        outputName: 'junit-report.xml',
        outputDirectory: 'coverage',
        classNameTemplate: '{title}',
        titleTemplate: '{classname}',
        ancestorSeparator: '    |>>>>>    ',
      },
    ],
  ],
};
