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
        title: 'cake',
    },
    {
        image: require('../assets/icons/heart.png'),
        title: 'heart',
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
  
  if(seconds / 31556926 > 0){
    let x = Math.trunc(seconds / 31556926 )
    seconds -= 31556926;
    result += (x + ' year' + (x > 0) ? 's and' : ' and')
    stat++;
    if(stat == 2 || seconds <= 0)
      return result += (x + ' year' + (x > 0) ? 's' : '')
    else 
      result += (x + ' year' + (x > 0) ? 's and' : ' and')
  }

  if(seconds / 2629743.83 > 0){
    let x = Math.trunc(seconds / 2629743.83 )
    seconds -= 2629743.83;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result += (x + ' month' + (x > 0) ? 's' : '')
    else 
      result += (x + ' month' + (x > 0) ? 's and' : ' and')
  }
  
  if(seconds / 604800  > 0){
    let x = Math.trunc(seconds / 604800  )
    seconds -= 604800;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result += (x + ' week' + (x > 0) ? 's' : '')
    else 
      result += (x + ' week' + (x > 0) ? 's and' : ' and')
  }

  if(seconds / 86400  > 0){
    let x = Math.trunc(seconds / 86400  )
    seconds -= 86400;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result += (x + ' day' + (x > 0) ? 's' : '')
    else 
     result += (x + ' day' + (x > 0) ? 's and' : ' and')
  }

  if(seconds / 3600  > 0){
    let x = Math.trunc(seconds / 3600)
    seconds -= 3600;
    stat++;
    if(stat == 2 || seconds <= 0)
      return result += (x + ' hour' + (x > 0) ? 's' : '')
    else 
      result += (x + ' hour' + (x > 0) ? 's and' : ' and' )
  }
  
  if(seconds / 60  > 0){
    seconds -= 60;
    let x = Math.trunc(seconds / 60)
    stat++;
    if(stat == 2 || seconds <= 0)
      return result += (x + ' minute' + (x > 0) ? 's' : '')
    else 
      result += (x + ' minute' + (x > 0) ? 's and' : ' and')
  }

  if(seconds / 60  < 0){
    result += seconds + ' second'
  }
 
  return result;
}

export const home_style =  {
    width: size.width,
    height: size.height * 0.07,
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#C1C1C1',
    borderWidth: 0.5
};