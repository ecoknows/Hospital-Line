import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { theme } from '../constants';

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
        alignContent,
        width,
        height,
        row,
        shadow,
        t_style,
        activeOpacity,
        white,
        scroll,
        light_blue,
        absolute,

        

        ...rest
    } = props

    const viewStyle = [
        style,
        absolute && {position : 'absolute'},

        center && {justifyContent: 'center'},
        middle && {alignItems: 'center'},

        // alignContent == false && { alignContent : alignContent},
        // alignContent && {alignContent: alignContent},

        flex == false && { flex : 0},
        flex && {flex: flex},

        height == false && { height : 0},
        height && {height: height},
        width == false && { width : 0},
        width && {width: width},
        row && {flexDirection: 'row'},

        white && styles.white,
        light_blue && styles.light_blue,
        
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
    if(shadow != undefined && animated){
        
        return(
            <BoxShadow setting={shadow}>
                <Animated.View style={[styles.view,viewStyle]} {...rest}>
                    {children}
                </Animated.View>
            </BoxShadow>
        )
    }
    


    if(shadow != undefined && !touchable){
        
        return(
            <BoxShadow setting={shadow}>
                <View style={[styles.view,viewStyle]} {...rest}>
                    {children}
                </View>
            </BoxShadow>
        )
    }
    

    if(shadow != undefined && touchable){
        return(
            <TouchableOpacity style={t_style} onPress={press} activeOpacity={activeOpacity}>
                <BoxShadow setting={shadow}>
                        <Animated.View style={[styles.view,viewStyle]} {...rest}>
                            {children}
                        </Animated.View>
                </BoxShadow>
            </TouchableOpacity>
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

    white: {backgroundColor: 'white'},
    light_blue : { backgroundColor: theme.color.light_blue},
});