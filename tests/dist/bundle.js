((dependencies) => {
    const module = { exports: {} };
    const process = {"env":{}};

    const require = (id) => {
      dependencies[id].fn(
        (path) => {
          return require(dependencies[id].links[path])
        },
        module,
        module.exports,
        process,
      );

      return module.exports;
    }
    require("0");
  })({
      ["0"]: {
            fn: (require, module, exports, process) => {
              "use strict";

exports.__esModule = true;
exports.default = void 0;

var _alloi = require("alloi");

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
}; // render the component


const root = document.querySelector("#app");
render(root, (() => {
  const __el0 = (0, _alloi.createComponent)(Component, {});

  return __el0;
})());
var _default = Component;
exports.default = _default;
            },
            links: {"alloi":2}
          },["1"]: {
            fn: (require, module, exports, process) => {
              "use strict";

exports.__esModule = true;
exports.useCondition = exports.useAtomic = exports.render = exports.onMount = exports.insert = exports.createReactor = exports.createElement = exports.createComponent = exports.convertToNode = void 0;

var _index = require("./dom/index.js");

exports.createElement = _index.createElement;
exports.createComponent = _index.createComponent;
exports.convertToNode = _index.convertToNode;
exports.insert = _index.insert;
exports.render = _index.render;

var _index2 = require("./reactive/index.js");

exports.useAtomic = _index2.useAtomic;
exports.createReactor = _index2.createReactor;
exports.useCondition = _index2.useCondition;
exports.onMount = _index2.onMount;
            },
            links: {"./dom/index.js":3,"./reactive/index.js":4}
          },["2"]: {
            fn: (require, module, exports, process) => {
              "use strict";

exports.__esModule = true;
exports.useCondition = exports.useAtomic = exports.render = exports.onMount = exports.insert = exports.createReactor = exports.createElement = exports.createComponent = exports.convertToNode = void 0;

var _index = require("./dom/index.js");

exports.createElement = _index.createElement;
exports.createComponent = _index.createComponent;
exports.convertToNode = _index.convertToNode;
exports.insert = _index.insert;
exports.render = _index.render;

var _index2 = require("./reactive/index.js");

exports.useAtomic = _index2.useAtomic;
exports.createReactor = _index2.createReactor;
exports.useCondition = _index2.useCondition;
exports.onMount = _index2.onMount;
            },
            links: {"./dom/index.js":5,"./reactive/index.js":6}
          },["3"]: {
            fn: (require, module, exports, process) => {
              "use strict";

exports.__esModule = true;
exports.render = exports.insert = exports.createElement = exports.createComponent = exports.convertToNode = void 0;

var _index = require("../alloi/index.js");

const createElement = (tag, attrs) => {
  const el = document.createElement(tag);

  for (let key in attrs) {
    const isEvent = key.startsWith("on");

    if (isEvent) {
      el.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
    } else {
      el.setAttribute(key, attrs[key]);
    }
  }

  return el;
}; // does nothing but might need in future.


exports.createElement = createElement;

const createComponent = (Component, props) => {
  (0, _index.createCollection)();
  const rendered = Component(props);
  (0, _index.runReactors)();
  return rendered;
};

exports.createComponent = createComponent;

const convertToNode = child => {
  if (typeof child === "string" || typeof child === "number") {
    return document.createTextNode(child);
  } else if (typeof child === "function") {
    return convertToNode(child());
  } else {
    return child;
  }
};

exports.convertToNode = convertToNode;

const insert = (parent, child) => {
  let childNode = convertToNode(child);
  parent.appendChild(childNode);

  if (typeof child === "function") {
    (0, _index.createReactor)(() => {
      const newChild = convertToNode(child);
      parent.replaceChild(newChild, childNode);
      childNode = newChild;
    });
  }
};

exports.insert = insert;

const render = (rootEl, rootNode) => {
  rootEl.appendChild(rootNode);
};

exports.render = render;
            },
            links: {"../alloi/index.js":7}
          },["4"]: {
            fn: (require, module, exports, process) => {
              "use strict";

exports.__esModule = true;
exports.useAtomic = exports.runReactors = exports.onMount = exports.createReactor = exports.createCollection = void 0;
let collectionId = 0;
const collections = {};

const sub = reactor => {
  const owner = collections[`${collectionId - 1}`];
  owner.reactors.push(reactor);
};

const unsub = (reactor, owner, index) => {
  owner.reactors.splice(index, 1);
  return reactor;
};

const createCollection = () => {
  const collection = {
    atoms: [],
    reactors: []
  };
  collections[collectionId++] = collection;
};

exports.createCollection = createCollection;

const useAtomic = state => {
  const owner = collections[`${collectionId - 1}`];
  owner.atoms.push(state);
  const atomIndex = owner.atoms.length - 1;

  const setState = newState => {
    owner.atoms[atomIndex] = newState;

    for (let reactor of owner.reactors) {
      reactor();
    }
  };

  const getState = () => {
    return owner.atoms[atomIndex];
  };

  return [getState, setState];
};
/* Create a reaction effect, which is a function that is called
 * when the state of the atomic is changed.
 */


exports.useAtomic = useAtomic;

const createReactor = (fn, options = {}) => {
  sub(fn);
};

exports.createReactor = createReactor;

const runReactors = () => {
  const owner = collections[`${collectionId - 1}`];

  for (let reactor of owner.reactors) {
    reactor();
  }
};

exports.runReactors = runReactors;

const onMount = fn => {
  const owner = collections[`${collectionId - 1}`];
  const reactorIndex = owner.reactors.length;
  createReactor(() => unsub(fn, owner, reactorIndex)());
};

exports.onMount = onMount;
            },
            links: {}
          },["5"]: {
            fn: (require, module, exports, process) => {
              "use strict";

exports.__esModule = true;
exports.render = exports.insert = exports.createElement = exports.createComponent = exports.convertToNode = void 0;

var _index = require("../alloi/index.js");

const createElement = (tag, attrs) => {
  const el = document.createElement(tag);

  for (let key in attrs) {
    const isEvent = key.startsWith("on");

    if (isEvent) {
      el.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
    } else {
      el.setAttribute(key, attrs[key]);
    }
  }

  return el;
}; // does nothing but might need in future.


exports.createElement = createElement;

const createComponent = (Component, props) => {
  (0, _index.createCollection)();
  const rendered = Component(props);
  (0, _index.runReactors)();
  return rendered;
};

exports.createComponent = createComponent;

const convertToNode = child => {
  if (typeof child === "string" || typeof child === "number") {
    return document.createTextNode(child);
  } else if (typeof child === "function") {
    return convertToNode(child());
  } else {
    return child;
  }
};

exports.convertToNode = convertToNode;

const insert = (parent, child) => {
  let childNode = convertToNode(child);
  parent.appendChild(childNode);

  if (typeof child === "function") {
    (0, _index.createReactor)(() => {
      const newChild = convertToNode(child);
      parent.replaceChild(newChild, childNode);
      childNode = newChild;
    });
  }
};

exports.insert = insert;

const render = (rootEl, rootNode) => {
  rootEl.appendChild(rootNode);
};

exports.render = render;
            },
            links: {"../alloi/index.js":8}
          },["6"]: {
            fn: (require, module, exports, process) => {
              "use strict";

exports.__esModule = true;
exports.useAtomic = exports.runReactors = exports.onMount = exports.createReactor = exports.createCollection = void 0;
let collectionId = 0;
const collections = {};

const sub = reactor => {
  const owner = collections[`${collectionId - 1}`];
  owner.reactors.push(reactor);
};

const unsub = (reactor, owner, index) => {
  owner.reactors.splice(index, 1);
  return reactor;
};

const createCollection = () => {
  const collection = {
    atoms: [],
    reactors: []
  };
  collections[collectionId++] = collection;
};

exports.createCollection = createCollection;

const useAtomic = state => {
  const owner = collections[`${collectionId - 1}`];
  owner.atoms.push(state);
  const atomIndex = owner.atoms.length - 1;

  const setState = newState => {
    owner.atoms[atomIndex] = newState;

    for (let reactor of owner.reactors) {
      reactor();
    }
  };

  const getState = () => {
    return owner.atoms[atomIndex];
  };

  return [getState, setState];
};
/* Create a reaction effect, which is a function that is called
 * when the state of the atomic is changed.
 */


exports.useAtomic = useAtomic;

const createReactor = (fn, options = {}) => {
  sub(fn);
};

exports.createReactor = createReactor;

const runReactors = () => {
  const owner = collections[`${collectionId - 1}`];

  for (let reactor of owner.reactors) {
    reactor();
  }
};

exports.runReactors = runReactors;

const onMount = fn => {
  const owner = collections[`${collectionId - 1}`];
  const reactorIndex = owner.reactors.length;
  createReactor(() => unsub(fn, owner, reactorIndex)());
};

exports.onMount = onMount;
            },
            links: {}
          },["7"]: {
            fn: (require, module, exports, process) => {
              "use strict";
            },
            links: {}
          },["8"]: {
            fn: (require, module, exports, process) => {
              "use strict";
            },
            links: {}
          },
  })