import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';

export default function Main(props : any){
    
    const {
        style,
        children,
        animated,
        touchable,
        press,
        center,
        middle,
        flex,
        flexDirection,
        width,
        height,

        ...rest
    } = props

    const viewStyle = [
        style,
        styles.view,

        center && {justifyContent: 'center'},
        middle && {alignItems: 'center'},

        flexDirection == false && { flexDirection : flexDirection},
        flexDirection && {flexDirection: flexDirection},

        flex == false && { flex : 0},
        flex && {flex: flex},

        height == false && { height : 0},
        height && {height: height},
        width == false && { width : 0},
        width && {width: width},
        
        
    ];
    if(touchable){
        return(
            <TouchableOpacity style={viewStyle} onPress={press}>
            <View>
                {children}  
            </View>
            </TouchableOpacity>
        )
    }

    if(animated){
        return(
            <Animated.View  style={viewStyle} {...rest}>
                {children}
            </Animated.View>
        )
    }

    return(
        <View style={viewStyle} {...rest}>
            {children}  
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});