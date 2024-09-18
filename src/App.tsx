import React from "react";
import Collection from "./components/Collection";

function App() {
  return (
    <React.Fragment>
      <div className="bg-blue-500 text-white">
        <h1 className="text-4xl text-center">Hello, Tailwind!</h1>
      </div>
      <Collection />
    </React.Fragment>
  );
}

export default App;
