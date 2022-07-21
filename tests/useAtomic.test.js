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

// render the component
const root = document.querySelector("#app")
render(root, <Component />);

export default Component;