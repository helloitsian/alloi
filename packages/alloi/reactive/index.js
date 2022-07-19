let collectionId = 0;
const collections = {}


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
  const owner = collections[`${collectionId - 1}`];

  owner.reactors.push(fn);
    
  try {
  	fn();
  } catch(err) {
    if (options.once) {
      owner.reactors.pop();
    }
  }
};

export const onMount = (fn) => {
  createReactor(fn, { once: true });
}