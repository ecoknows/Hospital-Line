import { Dimensions } from 'react-native';

export const mapStyle=[
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#d8e2fd"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#d84f4f"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#d84f4f"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e5fff3"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "color": "#8fa7ff"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#394ca2"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ff0000"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ff0000"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c93636"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ff0000"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#d6faff"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f0f4ff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#b3b3ff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#adb4ff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c9d4fd"
      }
    ]
  }
]
interface departments_interface {
    image : number,
    title : string,
}

export const departments : departments_interface[]=[
    {
        image: require('../assets/icons/gynecology.png'),
        title: 'Gynecology',
    },
    {
        image: require('../assets/icons/Gastroenterology.png'),
        title: 'Gastroenterology',
    },
    {
        image: require('../assets/icons/tooth.png'),
        title: 'Dental',
    },
    {
        image: require('../assets/icons/Orthopedic.png'),
        title: 'Orthopedic',
    },
    {
        image: require('../assets/icons/General_Medicine.png'),
        title: 'General Medicine',
    },
    {
        image: require('../assets/icons/Pediatrician.png'),
        title: 'Pediatrician',
    },
    {
        image: require('../assets/icons/cake.png'),
        title: 'Dermitology',
    },
    {
        image: require('../assets/icons/heart.png'),
        title: 'Cardiology',
    },
];

export const initial_region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export const initial_userposition = {
  longitude: -122.4324,
  latitude: 37.78825,
}

export const font = {
    TEKO: 'Teko',
    ROBOTO: 'Roboto',
    ROBOTO_BOLD: 'Roboto-Bold',
    OPEN_SANS: 'Open-Sans',
    ARCHIVO_BOLD: 'Archivo-Bold',
    ARIAL_BOLD: 'Arial-Bold',
    AVARAGE_SANS_REGULAR: 'AverageSans-Regular',
}



export const size = {
    normal : 15,
    title : 36,
    padding : 8,
    margin : 4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

};

export const color = {
    semi_black: '#404040',
    purple: '#3B58B5',
    gray : '#7A7A7A',
    light_gray: '#8B8B8B',
    light_blue : '#1DA6FD',
    light_accent : '#55BCFD',
    accent : '#1DA6FD',
};

export const home = {
    alignSelf:'center',
    top: -25,
};




export function readable_time(seconds : number){
  let result : string = '';
  let stat : number = 0;
  
  if(seconds / 31556926 >= 1){
    console.log('ecasd ' + seconds / 31556926);
    let x = Math.trunc(seconds / 31556926 )
    seconds -= 31556926;
    result += (x + ' year' + (x > 1) ? 's and ' : ' and ')
    stat++;
    if(stat == 2 || seconds <= 0)
      return result + (x + ' year') + ((x > 1) ? 's' : '')
    else 
      result + (x + ' year') + ((x > 1) ? 's and ' : ' and ')
  }

  if(seconds / 2629743.83 >= 1){
    let x = Math.trunc(seconds / 2629743.83 )
    seconds -= 2629743.83;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result + (x + ' month') + ((x > 1) ? 's' : '')
    else 
      result += (x + ' month') + ((x > 1) ? 's and ' : ' and ')
  }
  
  if(seconds / 604800  >= 1){
    let x = Math.trunc(seconds / 604800  )
    seconds -= 604800;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result + (x + ' week') + ((x > 1) ? 's' : '')
    else 
      result += (x + ' week' ) + ((x > 1) ? 's and ' : ' and ')
  }

  if(seconds / 86400 >= 1){
    let x = Math.trunc(seconds / 86400  )
    seconds -= 86400;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result + (x + ' day') + ((x > 1) ? 's' : '')
    else 
     result += (x + ' day') + ((x > 1) ? 's and ' : ' and ')
  }

  if(seconds / 3600  >= 1){
    let x = Math.trunc(seconds / 3600)
    seconds -= 3600 * x;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result + x + ' hour' + ((x > 1) ? 's' : '')
    else 
      result += (x + ' hour') + ((x > 1) ? 's and ' : ' and ' )
  }
  
  if(seconds / 60  >= 1){
    
    let x = Math.trunc(seconds / 60)
    seconds -= 60 * x;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result + x + ' minute' + ( (x > 1) ? 's' : '' )
    else 
      result += (x + ' minute') + ((x > 1) ?'s and ' : ' and ')
  }

  
  if(Math.trunc(seconds / 60)  <= 1){
    result += Math.trunc(seconds) + ' seconds'
  }
 
  return result;
}

export const direct_images =(type,bearing_after,modifier)=>{
  if(type == 'arrive')
    return require('../assets/direction_icons/destination.png')
  if(type == 'depart'){
    switch(getCardinal(bearing_after)){
      case 'north': return require('../assets/direction_icons/north.png')
      case 'northeast': return require('../assets/direction_icons/northeast.png')
      case 'northwest': return require('../assets/direction_icons/northwest.png')
      case 'east': return require('../assets/direction_icons/east.png')
      case 'west': return require('../assets/direction_icons/west.png')
      case 'south': return require('../assets/direction_icons/south.png')
      case 'southeast': return require('../assets/direction_icons/southeast.png')
      case 'southwest': return require('../assets/direction_icons/southwest.png')
    }
  }

  switch(modifier){
    case 'right': return require('../assets/direction_icons/right.png')
    case 'left': return require('../assets/direction_icons/left.png')
    case 'straight': return require('../assets/direction_icons/straight.png')
    case 'slight right': return require('../assets/direction_icons/slight_right.png')
    case 'slight left': return require('../assets/direction_icons/slight_left.png')
  }
}

export const direct_text =(name,type,modifier, bearing_after)=>{
  console.log(bearing_after , type , getCardinal(bearing_after));
  
  if (type == 'depart')
    return ' Head ' + getCardinal(bearing_after) +' ' + name;
  if (type == 'arrive'){
    modifier = modifier == undefined ? '' : ' on the ' + modifier
    return ' You have arrive at your destination, ' + modifier;
  }
  if(modifier == 'straight')
    return ' Continue onto '+name;
  if(modifier == 'left' || modifier == 'right')
    return ' Turn '+ modifier +' onto '+name;
  if(modifier == 'slight right' || modifier == 'slight left')
    return ' Make a '+ modifier +' onto '+name;
  if((modifier == 'slight right' || modifier == 'slight left') && type == 'continue')
    return ' Make a '+ modifier +' to stay on '+name;
    
  }

  
export function getCardinal(angle) {
  /** 
   * Customize by changing the number of directions you have
   * We have 8
   */
  const degreePerDirection = 360 / 8;

  /** 
   * Offset the angle by half of the degrees per direction
   * Example: in 4 direction system North (320-45) becomes (0-90)
   */
  const offsetAngle = angle + degreePerDirection / 2;

  return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "north"
    : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "northeast"
      : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "east"
        : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "southeast"
          : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "south"
            : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "southwest"
              : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "west"
                : "northwest"; 
}

export const home_style =  {
    width: size.width,
    height: size.height * 0.07,
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#C1C1C1',
    borderWidth: 0.5
};