import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function Main(props : any){
    
    const {
        style,
        children,
        animated,
        center,
        middle,
        flex,

        ...rest
    } = props

    const viewStyle = [
        style,
        styles.view,

        center && {justifyContent: 'center'},
        middle && {alignItems: 'center'},

        flex == false && { flex : 0},
        flex && {flex: flex},
        
    ];


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