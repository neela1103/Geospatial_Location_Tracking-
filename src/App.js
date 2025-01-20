import React from "react";
import FictionalMap from "./pages/FictionalMap";
import RealWorldMap from "./pages/RealWorldMap";
import MapSwitcher from "./pages/MapSwitcher";
// import TempMap from "./pages/TempMap";

const App = () => {
  return (
    <div>
      {/* Use MapSwitcher to toggle between maps */}
      {/* <TempMap /> */}
      <MapSwitcher>
        <FictionalMap />
        <RealWorldMap />
      </MapSwitcher>
    </div>
  );
};

export default App;
