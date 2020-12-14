import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Main(props : any){
    
    const {
        style,
        src,
        touchable,
        press,
        width,
        height,

        ...rest
    } = props

    const imageStyle = [
        style,
        styles.image,

        height == false && { height : 0},
        height && {height: height},
        width == false && { width : 0},
        width && {width: width},

        
    ];
    if(touchable){
        return(
            <TouchableOpacity onPress={press}>
              <Image style={imageStyle} source={src} {...rest}/>
            </TouchableOpacity>
        )
    }

    return(
        <Image style={imageStyle} source={src} {...rest}/>
    );
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
    },
});