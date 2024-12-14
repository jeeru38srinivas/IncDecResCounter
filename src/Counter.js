import React, { useState } from "react";

function Counter() {
  // State to hold the current count
  const [count, setCount] = useState(0);

  // Function to increment the count
  const increment = () => setCount((prevCount) => prevCount + 1);

  // Function to decrement the count, ensuring it doesn't go below 0
  const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, 0));

  // Function to reset the count
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={decrement} style={{ marginRight: "10px" }}>
        Decrement
      </button>
      <button onClick={increment} style={{ marginRight: "10px" }}>
        Increment
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
