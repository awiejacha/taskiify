module.exports = {
  testEnvironment: 'node',
  roots: [
    './src/',
    './tests/',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: './tests/.*',
  testPathIgnorePatterns: [
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  coveragePathIgnorePatterns: [
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
  ],
  coverageReporters: [
    'lcov',
    'text',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['jest-expect-message']
};
