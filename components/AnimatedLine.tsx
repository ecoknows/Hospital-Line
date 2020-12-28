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
            strokeColor="#8F95FF" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
        />
        </View>
    );

}

function PolyLines(){

}

export default Main;