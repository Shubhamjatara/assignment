import { useEffect, useState, useRef } from "react";
import Directions from "../directions/Directions";
import Animation from "../animation/Animation";
function Map({ mapOptions }) {
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState();
  const ref = useRef();
  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
    console.log(map);
  }, []);
  return (
    <>
      <div className="w-full h-screen" ref={ref} id="map" />
      {map && <Directions setRoute={setRoute} />}
      {map && route && <Animation map={map} route={route} mapOptions={mapOptions} />}
    </>
  );
}

export default Map;
