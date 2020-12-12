
const mapStyle=[
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]

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
}

const size = {
    normal : 15,
    title : 36,
    padding : 8,
    margin : 4,

}

const color = {
    gray : '#7A7A7A',
    light_gray: '#8B8B8B',
    light_blue : '#1DA6FD',
    light_accent : '#55BCFD',
    accent : '#1DA6FD',
}

export {
    mapStyle,
    initial_region,
    testing_data,
    initial_userposition,
    font,
    color,
    size
}
  