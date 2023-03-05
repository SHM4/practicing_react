import { useState, useEffect } from "react";

function Hello() {

  // 두 함수는 같은 것. 그냥 함수 모양만 다름.
  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :(");
  }, []);
  useEffect(function() {
    console.log("hi :)");
    return function () {
      console.log("bye :(");
    }
  }, []);

  return <h1>Hello</h1>
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      <button onClick={onClick}>{showing ? "Hide" : "Show" }</button>
      {showing ? <Hello /> : null}
    </div>
  );
}

export default App;