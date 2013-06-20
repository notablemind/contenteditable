// Karma configuration
files = [
  MOCHA,
  MOCHA_ADAPTER,
  'sinon-1.7.1.js',
  '../build/build.js',
  'tests-e2e.js'
];
reporters = ['dots'];
colors = true;
browsers = ['PhantomJS'];
singleRun = true;
