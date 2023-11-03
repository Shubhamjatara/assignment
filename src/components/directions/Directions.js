import { useEffect,useState } from "react";
import fetchDirections from "../methods/fetchDirections";
 function Directions({setRoute}){
    const [origin] = useState("27 Front St E Toronto");
    const [destination] = useState("75 Yonge Street Toronto");
    useEffect(()=>{
        fetchDirections(origin,destination,setRoute);
    },[origin,destination]);
   
}

export default Directions;