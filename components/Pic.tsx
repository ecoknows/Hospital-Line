import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Main(props : any){
    
    const {
        style,
        src,
        touchable,
        press,
        width,
        height,
        t_style,

        ...rest
    } = props

    const imageStyle = [
        style,

        height == false && { height : 0},
        height && {height: height},
        width == false && { width : 0},
        width && {width: width},

        
    ];
    if(touchable){
        return(
            <TouchableOpacity onPress={press} style={[styles.touch,t_style]}>
              <Image style={[ styles.image, imageStyle]} source={src} {...rest}/>
            </TouchableOpacity>
        )
    }

    return(
        <Image style={[styles.image, imageStyle]} source={src} {...rest}/>
    );
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
    },
    touch:{
    },
});