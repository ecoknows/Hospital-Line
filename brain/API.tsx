const HTTP_HOSTING_ADDRESS = /*'https://hospitalline.loca.lt/'*/ "http://192.168.1.16:5000/";

interface route_interface{
    fromCoordinates: {latitude: number ,longitude : number},
    toCoordinates: {latitude: number ,longitude : number},
}

function route(func : any ,{ fromCoordinates, toCoordinates } : route_interface ){
    const OSRM_API_REQUEST = HTTP_HOSTING_ADDRESS + 'route/v1/driving/' +
            fromCoordinates.longitude.toString() + ',' +fromCoordinates.latitude.toString() + ';' +
            toCoordinates.longitude.toString() + ',' + toCoordinates.latitude.toString() + '?steps=true';
    
    fetch(OSRM_API_REQUEST).then((response) => response.json()).then(
        (json)=>{
            const arr = [];
        
            for(let i = 0; i < json.routes[0].legs[0].steps.length; i++){
              for(let x = 0; x < json.routes[0].legs[0].steps[i].intersections.length; x++){
                const loc = json.routes[0].legs[0].steps[i].intersections[x].location;
                arr.push({longitude: loc[0], latitude: loc[1]});
              }
            }
            func(arr);    
        }
    ).catch((error) => {
        console.error(error);
      });
}

export default{
    route
}