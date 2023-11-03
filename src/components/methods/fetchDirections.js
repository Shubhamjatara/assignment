import { getGeocode,getLatLng } from "use-places-autocomplete";
async function fetchDirections(origin, destination, setRoute) {
  const [originResult, destinationResult] = await Promise.all([
    getGeocode({ address: origin }),
    getGeocode({ address: destination }),
  ]);



  const [originLocation, destinationLocation] = await Promise.all([
    getLatLng(originResult[0]),
    getLatLng(destinationResult[0]),
  ]);

  console.log(originLocation,destinationLocation)

  const service = new window.google.maps.DirectionsService();
  service.route(
    {
      origin:originLocation,
      destination:destinationLocation,
      travelMode:window.google.maps.TravelMode.WALKING
    },
    (result,status)=>{
      if(status==="OK" && result)
      {
        //console.log(result)
        const route = result.routes[0].overview_path.map((path)=>({
          lat:path.lat(),
          lng:path.lng()
        }))
        setRoute(route);
      }
   

    }
  )
}

export default fetchDirections;
