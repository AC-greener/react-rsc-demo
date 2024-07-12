// App.js
import React from "react";
function App() {
  return (
    <div>
    <h1 onClick={() => console.log('clicked')}>
      <button>Click it</button>
    </h1>
    <p>This is a simple React app.</p>
  </div>
  );
}

export default App;