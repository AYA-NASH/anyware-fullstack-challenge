module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!redux-thunk|@reduxjs/toolkit)/',
  ],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
};