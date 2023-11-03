import React, { useState, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import Map from "./components/Map/Map";
const mapOptions = {
  mapId: "8c6fabe1934621aa",
  center: { lat: 43.66293, lng: -79.39314 },
  zoom: 18,
  disableDefaultUI: true,
  heading: 25,
  tilt: 60,
};

function App() {
  return (
    <div className="w-full h-screen">
      <Wrapper apiKey={"AIzaSyDvPLKp3jbXqZnybV92qe2wbJ4DWptExM4"}>
        <Map mapOptions={mapOptions} />
      </Wrapper>
    </div>
  );
}

export default App;
