// src/App.js
import React from "react";
function App() {
  return (
    <div>
    <h1 onClick={() => console.log('clicked')}>Hello, world!</h1>
    <p>This is a simple React app.</p>
  </div>
  );
}

export default App;

// src/App.js
// import React, { Suspense } from "react";

// const ListOfBreeds = React.lazy(() => import("./DogBreeds"));

// function App() {
//   return (
//     <div>
//       <h1>Dog Breeds</h1>
//       <Suspense fallback={<div>Loading Dog Breeds...</div>}>
//         <ListOfBreeds />
//       </Suspense>
//     </div>
//   );
// }

// export default App;