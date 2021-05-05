module.exports = {
  name: 'mobile',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mobile',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  coverageThreshold: {
    "global": {
      "branches": 60,
      "functions": 60,
      "lines": 60,
      "statements": -10
    }
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|@ionic-native|@ionic|@auna)'],
};
