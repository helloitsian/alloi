const AlloiJSX = require('alloi-jsx');

module.exports = {
  entry: './onMount.test.js',
  out: './dist/bundle.js',
  mutators: [
    new AlloiJSX(),
  ],
}