import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { theme } from '../constants';

export default function Main(props : any){
    
    const {
        style,
        children,
        animated,
        flex,

        ...rest
    } = props

    const buttonStyle = [
        style,,
        
    ];

    return(
        <TouchableOpacity style={[styles.view,buttonStyle]} {...rest}>
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: theme.color.light_accent,
        height: 50,
        width: 160,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',

    },
});