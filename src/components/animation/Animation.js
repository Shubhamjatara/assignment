import ThreeJSOverlayView from "@ubilabs/threejs-overlay-view";
import { useEffect, useRef } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Person from "../../gltf/medieval_man/scene.gltf";
const ANIMATION_MS = 10000;
const FRONT_VECTOR = new Vector3(0, -1, 0);

function Animation({ route, mapOptions, map }) {
  const overlayRef = useRef();
  const trackRef = useRef();
  const PersonRef = useRef();

  useEffect(() => {
    map.setCenter(route[Math.floor(route.length / 2)], 12);

    if (!overlayRef.current) {
      overlayRef.current = new ThreeJSOverlayView(mapOptions.center);
      overlayRef.current.setMap(map);
    }
    //console.log(route)
    const scene = overlayRef.current.getScene();
    const points = route.map((p) => overlayRef.current.latLngAltToVector3(p));
    // console.log(points)
    const curve = new CatmullRomCurve3(points);

    if (trackRef.current) {
      scene.remove(trackRef.current);
    }
 

    trackRef.current = createTrackFromCurve(curve);
    scene.add(trackRef.current);

    
    loadModel().then((model) => {
        if (PersonRef.current) {
          scene.remove(PersonRef.current);
        }
        PersonRef.current = model;
        scene.add(PersonRef.current);
      });

    overlayRef.current.update = () => {
      trackRef.current.material.resolution.copy(
        overlayRef.current.getViewportSize()
      );

      if (PersonRef.current) {
        const progress = (performance.now() % ANIMATION_MS) / ANIMATION_MS;
        curve.getPointAt(progress, PersonRef.current.position);
        PersonRef.current.quaternion.setFromUnitVectors(
          FRONT_VECTOR,
          curve.getTangentAt(progress)
        );
        PersonRef.current.rotateX(Math.PI / 2);
      }

      overlayRef.current.requestRedraw();
    };
    // return () => {
    // //   scene.remove(trackRef.current);
    // //   scene.remove(PersonRef.current);
    // };
  }, [route]);

  return null;
}

export default Animation;

function createTrackFromCurve(curve) {
  const points = curve.getSpacedPoints(curve.points.length * 10);

  const positions = points.map((point) => point.toArray()).flat();
  console.log(positions);
  return new Line2(
    new LineGeometry().setPositions(positions),
    new LineMaterial({
      color: 0xffb703,
      linewidth: 8,
    })
  );
}

async function loadModel() {
  const loader = new GLTFLoader();
  const object = await loader.loadAsync("/medieval_man/scene.gltf");
  const scene = object.scene;
  scene.scale.setScalar(0.2);
  return scene;
}
