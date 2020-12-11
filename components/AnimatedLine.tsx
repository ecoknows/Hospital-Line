import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Polyline } from 'react-native-maps';


let complete = 0;
let coords_length = 0;
interface line_interface {
    coordinates: [],
    time : number,
}
function Main({time, coordinates} : line_interface){
    const [coords, setCoords] = useState([]); 

    useEffect(()=>{
        setCoords([]);
        coords_length = coordinates.length;
    
        console.log(complete);

        clearInterval(animatedTime);
        const animatedTime = setInterval(()=>{
            if(coordinates[complete] != undefined){
                setCoords(items =>[...items, coordinates[complete]]);
                complete++;
            }

            if(complete >= coords_length){
                clearInterval(animatedTime);
                complete = 0;
            }
        },time || 10);

    }, [coordinates]);

    return(
        <View>
            

        <Polyline
            coordinates={coords}
            strokeColor='rgba(91, 91, 91, 0.10)' // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={10}
        />
        <Polyline
            coordinates={coords}
            strokeColor="#7A7A7A" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={5}
        />
        </View>
    );

}

function PolyLines(){

}

export default Main;