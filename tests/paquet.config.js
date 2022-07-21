const AlloiJSX = require('alloi-jsx');

module.exports = {
  entry: './useAtomic.test.js',
  out: './dist/bundle.js',
  mutators: [
    new AlloiJSX(),
  ],
}