import { Dimensions } from 'react-native';

const mapStyle=[
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

const departments : departments_interface[]=[
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

const initial_region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const testing_data = [
  {
    place: 'Mary Johnson Hospital',
    coordinate: {latitude: 14.6093263, longitude: 120.9717062},
    percentage: '93%',
    color: 'red',
    status: 'available',
    image: require('../assets/images/mary_johnson.jpg'),
  },
  {
    place: 'Gat Andress Bonifacio Medical Center',
    coordinate: {latitude: 14.6255056, longitude: 120.9761906},
    percentage: '54%',
    color: 'orange',
    status: 'available',
    image: require('../assets/images/gat_andres.jpg'),
  },
  {
    place: 'Mother and Child Hospital',
    coordinate: {latitude: 14.5941642, longitude: 120.9697479},
    percentage: '20%',
    color: '#CDCF00',
    status: 'available',
    image: require('../assets/images/mother_and_child.jpg'),
  },
  {
    place: 'San Lazaro Hospital',
    coordinate: {latitude: 14.6344272, longitude: 120.9703904},
    percentage: '13%',
    color: 'green',
    status: 'available',
    image: require('../assets/images/san_lazaro_hospital.jpg'),
  },
]

const initial_userposition = {
  longitude: -122.4324,
  latitude: 37.78825,
}

const font = {
    TEKO: 'Teko',
    ROBOTO: 'Roboto',
    ROBOTO_BOLD: 'Roboto-Bold',
    OPEN_SANS: 'Open-Sans',
    ARCHIVO_BOLD: 'Archivo-Bold',
    ARIAL_BOLD: 'Arial-Bold',
    AVARAGE_SANS_REGULAR: 'AverageSans-Regular',
}



const size = {
    normal : 15,
    title : 36,
    padding : 8,
    margin : 4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

};

const color = {
    semi_black: '#404040',
    purple: '#3B58B5',
    gray : '#7A7A7A',
    light_gray: '#8B8B8B',
    light_blue : '#1DA6FD',
    light_accent : '#55BCFD',
    accent : '#1DA6FD',
};

const home = {
    alignSelf:'center',
    top: -25,
};

const home_style =  {
    width: size.width,
    height: size.height * 0.07,
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#C1C1C1',
    borderWidth: 0.5
};


export {
    mapStyle,
    initial_region,
    testing_data,
    initial_userposition,
    font,
    color,
    size,
    home,
<<<<<<< Updated upstream
    home_style,
    departments,
=======
    home_style
>>>>>>> Stashed changes
}
  