import { useAtomic, render, onMount, createReactor } from "alloi";

const Component = () => {
  const [count, setCount] = useAtomic(0);

  onMount(() => {
    console.log("mounted")
    setCount(count() + 1);
  });

  return (
    <div>
      <div>{() => { console.log("rendered"); return count }}</div>
      <button onClick={() => setCount(count() + 1)}>Click me!</button>
    </div>
  )
}

// render the component
const root = document.querySelector("#app")
render(root, <Component />);

export default Component;