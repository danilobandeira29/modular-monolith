module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
