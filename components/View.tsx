import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

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
        row,
        shadow,
        t_style,
        activeOpacity,
        white,
        scroll,

        ...rest
    } = props

    const viewStyle = [
        style,

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
        row && {flexDirection: 'row'},

        white && styles.white,
        
        
    ];

    if(scroll){
        
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={[styles.view,viewStyle]} {...rest}>
                    {children}  
                </View>
            </ScrollView>
        );
    }


    if(shadow != undefined){
        return(
            <BoxShadow setting={shadow}>
                <View style={[styles.view,viewStyle]} {...rest}>
                    {children}
                </View>
            </BoxShadow>
        )
    }

    if(touchable && animated){
        return(
            <TouchableOpacity style={t_style} onPress={press} activeOpacity={activeOpacity}>
                <Animated.View style={[styles.view,viewStyle]} {...rest}>
                    {children}
                </Animated.View>
            </TouchableOpacity>
        )
    }

    if(touchable){
        return(
            <TouchableOpacity style={[styles.view,viewStyle]} onPress={press} {...rest}>
                <View>
                    {children}  
                </View>
            </TouchableOpacity>
        )
    }

    if(animated){
        return(
            <Animated.View  style={[styles.view,viewStyle]} {...rest}>
                {children}
            </Animated.View>
        )
    }

    return(
        <View style={[styles.view,viewStyle]} {...rest}>
            {children}  
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    white: {backgroundColor: 'white'}
});