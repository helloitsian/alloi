let collectionId = 0;
const collections = {}

const sub = (reactor) => {
  const owner = collections[`${collectionId - 1}`];
  owner.reactors.push(reactor);
}

const unsub = (reactor, owner, index) => {
  owner.reactors.splice(index, 1);
  return reactor;
}

export const createCollection = () => {
  const collection = {
    atoms: [],
    reactors: [],
  }

  collections[collectionId++] = collection;
}

export const useAtomic = (state) => {
  const owner = collections[`${collectionId - 1}`];
  owner.atoms.push(state);
  const atomIndex = owner.atoms.length - 1;

  const setState = (newState) => {
    owner.atoms[atomIndex] = newState;

    for (let reactor of owner.reactors) {
      reactor();
    }
  }
  
  const getState = () => {
    return owner.atoms[atomIndex];
  }
  
  return [getState, setState];
};


/* Create a reaction effect, which is a function that is called
 * when the state of the atomic is changed.
 */
export const createReactor = (fn, options={}) => {
  sub(fn);
};

export const runReactors = () => {
  const owner = collections[`${collectionId - 1}`];
  for (let reactor of owner.reactors) {
    reactor();
  }
}

export const onMount = (fn) => {
  const owner = collections[`${collectionId - 1}`];
  const reactorIndex = owner.reactors.length;
  createReactor(() => unsub(fn, owner, reactorIndex)());
}