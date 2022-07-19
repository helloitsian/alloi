# Alloi

Alloi is a simple, fast, and close to the metal Frontend Framework.

## Example
```javascript
import { useAtomic, createReactor } from "alloi";

const Component = () => {
  const [count, setCount] = useAtomic(0);
  
  createReactor(() => {
    console.log("Updated count is:", count());
  });
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count() + 1)}>
        Incrememnt
      </button>
    </div>
  );
}
```

## To Run
This Framework was made for a future tutorial series where I make a fullstack set of tools from scratch. 
So currently, the only way to create a Alloi project is to use my [custom bundler](https://github.com/helloitsian/paquet) and [JSX parser mutator](https://github.com/helloitsian/alloi-jsx) for said bundler.

Steps:
1. create a project directory for your new project
2. `npm install --save-dev paquet`
3. `npm install --save-dev alloi-jsx`
4. Create a `paqquet.config.js` file and add this to it:
```javascript
const AlloiJSX = require('alloi-jsx');

module.exports = {
  entry: './path/to/index.js',
  out: './dist/bundle.js',
  mutators: [
    // use JSX mutator to compile JSX to Alloi Vanila JS Code
    new AlloiJSX(),
  ],
}
```
5. Build by running `paquet` in your terminal
6. Include the Bundled JavaScript in your `html` file.
7. Hopefully it runs on the browser!

Alternatively, you can try using the tests located in the `tests` directory of this repo to try the framework out.
