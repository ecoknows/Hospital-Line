import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Main(props : any){
    
    const {
        style,
        src,
        touchable,
        press,

        ...rest
    } = props

    const imageStyle = [
        style,
        styles.image,

        
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