# Alloi

Alloi is a simple and close to the metal Frontend Framework.

## Example
### Alloi Code
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
### Compiles to
```javascript
const Component = () => {
  const [count, setCount] = (0, _alloi.useAtomic)(0);
  (0, _alloi.createReactor)(() => {
    console.log("Updated count is:", count());
  });
  return (() => {
    const __el0 = (0, _alloi.createElement)("div", {});

    const __el1 = (0, _alloi.createElement)("h1", {});

    const __el3 = count;
    (0, _alloi.insert)(__el1, __el3);
    (0, _alloi.insert)(__el0, __el1);

    const __el2 = (0, _alloi.createElement)("button", {
      "onClick": () => setCount(count() + 1)
    });

    const __txtEl3 = "Incrememnt";
    (0, _alloi.insert)(__el2, __txtEl3);
    (0, _alloi.insert)(__el0, __el2);
    return __el0;
  })();
};
```

## To Run
This Framework was made for a future tutorial series where I make a fullstack set of tools from scratch. 
So currently, the only way to create a Alloi project is to use my [custom bundler](https://github.com/helloitsian/paquet) and [JSX parser mutator](https://github.com/helloitsian/alloi-jsx) for said bundler.

Steps:
1. Create a project directory for your new project
2. `npm install --save alloi`
3. `npm install --save-dev paquet`
4. `npm install --save-dev alloi-jsx`
5. Create a `paqquet.config.js` file and add this to it:
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
6. Build by running `paquet` in your terminal
7. Include the Bundled JavaScript in your `html` file.
8. Hopefully it runs on the browser!

Alternatively, you can try using the tests located in the `tests` directory of this repo to try the framework out.
