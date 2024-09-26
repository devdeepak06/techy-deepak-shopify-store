import React, { Profiler } from "react";
import { Header, CollectionComponent } from "./components";

type ProfilerOnRenderCallback = (
  id: string,
  phase: "mount" | "update" | "nested-update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => void;

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};

function App() {
  return (
    <React.Fragment>
      <Profiler id="Header" onRender={onRenderCallback}>
        <Header />
      </Profiler>

      <CollectionComponent />
    </React.Fragment>
  );
}

export default App;
