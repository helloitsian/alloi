import { createCollection, createReactor, runReactors } from "../alloi/index.js";

export const createElement = (tag, attrs) => {
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
};

// does nothing but might need in future.
export const createComponent = (Component, props) => {
  createCollection();
  const rendered = Component(props);
  runReactors();
  return rendered;
}

export const convertToNode = (child) => {
  if (typeof child === "string" || typeof child === "number") {
    return document.createTextNode(child);
  } else if (typeof child === "function") {
    return convertToNode(child());
  } else {
    return child;
  }
};

export const insert = (parent, child) => {
  let childNode = convertToNode(child);
  parent.appendChild(childNode);

  if (typeof child === "function") {
    createReactor(() => {
      const newChild = convertToNode(child);
      parent.replaceChild(newChild, childNode);
      childNode = newChild;
    });
  }
};

export const render = (rootEl, rootNode) => {
  rootEl.appendChild(rootNode);
};
