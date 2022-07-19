import { useAtomic, render, } from "alloi";

const ChildComponent = ({ message }) => {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

const ParentComponent = () => {
  const [message, setMessage] = useAtomic("Hello");

  return (
    <div>
      <ChildComponent message={message} />
      <button onClick={() => setMessage("World")}>Click me!</button>
    </div>
  );
}


// render the component
const root = document.querySelector("#app")
render(root, <ParentComponent />);