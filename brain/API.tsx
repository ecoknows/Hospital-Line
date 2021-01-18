const HTTP_HOSTING_ADDRESS_CAR = 'https://hospitallinecar.loca.lt/';
const HTTP_HOSTING_ADDRESS_BIKE = 'https://hospitallinebike.loca.lt/';
const HTTP_HOSTING_ADDRESS_FOOT = 'https://hospitallinefoot.loca.lt/';



interface route_interface{
    fromCoordinates: {latitude: number ,longitude : number},
    toCoordinates: {latitude: number ,longitude : number},
}

interface RoutesInterface{
  total_distance: number,
  duration: number,
  steps: {latitude: number, longitude: number}[],
  maneuver: {
    name: string,
    type: string,
    bearing_after: number,
    modifier: string,
    distance: number,
  }[]
}

export function route_car(func : any ,{ fromCoordinates, toCoordinates } : route_interface ){
    const OSRM_API_REQUEST = HTTP_HOSTING_ADDRESS_CAR + 'route/v1/driving/' +
            fromCoordinates.longitude.toString() + ',' +fromCoordinates.latitude.toString() + ';' +
            toCoordinates.longitude.toString() + ',' + toCoordinates.latitude.toString() + '?steps=true';
    
    fetch(OSRM_API_REQUEST).then((response) => response.json()).then(
        (json)=>{
            const result : RoutesInterface = {
              total_distance: 0,
              duration: 0,
              steps: [],
              maneuver: [],
            };


            result.total_distance = json.routes[0].distance;
            result.duration = json.routes[0].duration;
        
            for(let i = 0; i < json.routes[0].legs[0].steps.length; i++){
              result.maneuver.push({
                name: json.routes[0].legs[0].steps[i].name,
                type: json.routes[0].legs[0].steps[i].maneuver.type,
                bearing_after: json.routes[0].legs[0].steps[i].maneuver.bearing_after,
                modifier: json.routes[0].legs[0].steps[i].maneuver.modifier,
                distance: json.routes[0].legs[0].steps[i].distance,
              })

              for(let x = 0; x < json.routes[0].legs[0].steps[i].intersections.length; x++){
                const loc = json.routes[0].legs[0].steps[i].intersections[x].location;
                result.steps.push({longitude: loc[0], latitude: loc[1]});
              }
            }
            func(result);    
        }
    ).catch((error) => {
        console.error(error);
      });
}

export function route_bike(func : any ,{ fromCoordinates, toCoordinates } : route_interface ){
  const OSRM_API_REQUEST = HTTP_HOSTING_ADDRESS_BIKE + 'route/v1/driving/' +
          fromCoordinates.longitude.toString() + ',' +fromCoordinates.latitude.toString() + ';' +
          toCoordinates.longitude.toString() + ',' + toCoordinates.latitude.toString() + '?steps=true';
  
  fetch(OSRM_API_REQUEST).then((response) => response.json()).then(
      (json)=>{
          const result : RoutesInterface = {
            total_distance: 0,
            duration: 0,
            steps: [],
            maneuver: [],
          };


          result.total_distance = json.routes[0].distance;
          result.duration = json.routes[0].duration;
      
          for(let i = 0; i < json.routes[0].legs[0].steps.length; i++){
            result.maneuver.push({
              name: json.routes[0].legs[0].steps[i].name,
              type: json.routes[0].legs[0].steps[i].maneuver.type,
              bearing_after: json.routes[0].legs[0].steps[i].maneuver.bearing_after,
              modifier: json.routes[0].legs[0].steps[i].maneuver.modifier,
              distance: json.routes[0].legs[0].steps[i].distance,
            })

            for(let x = 0; x < json.routes[0].legs[0].steps[i].intersections.length; x++){
              const loc = json.routes[0].legs[0].steps[i].intersections[x].location;
              result.steps.push({longitude: loc[0], latitude: loc[1]});
            }
          }
          func(result);    
      }
  ).catch((error) => {
      console.error(error);
    });
}

export function route_foot(func : any ,{ fromCoordinates, toCoordinates } : route_interface ){
  const OSRM_API_REQUEST = HTTP_HOSTING_ADDRESS_FOOT + 'route/v1/driving/' +
          fromCoordinates.longitude.toString() + ',' +fromCoordinates.latitude.toString() + ';' +
          toCoordinates.longitude.toString() + ',' + toCoordinates.latitude.toString() + '?steps=true';
  
  fetch(OSRM_API_REQUEST).then((response) => response.json()).then(
      (json)=>{
          const result : RoutesInterface = {
            total_distance: 0,
            duration: 0,
            steps: [],
            maneuver: [],
          };


          result.total_distance = json.routes[0].distance;
          result.duration = json.routes[0].duration;
      
          for(let i = 0; i < json.routes[0].legs[0].steps.length; i++){
            result.maneuver.push({
              name: json.routes[0].legs[0].steps[i].name,
              type: json.routes[0].legs[0].steps[i].maneuver.type,
              bearing_after: json.routes[0].legs[0].steps[i].maneuver.bearing_after,
              modifier: json.routes[0].legs[0].steps[i].maneuver.modifier,
              distance: json.routes[0].legs[0].steps[i].distance,
            })

            for(let x = 0; x < json.routes[0].legs[0].steps[i].intersections.length; x++){
              const loc = json.routes[0].legs[0].steps[i].intersections[x].location;
              result.steps.push({longitude: loc[0], latitude: loc[1]});
            }
          }
          func(result);    
      }
  ).catch((error) => {
      console.error(error);
    });
}
