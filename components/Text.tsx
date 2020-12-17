import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../constants';

export default function Main(props : any){
    
    const {
        style,

        title,
        light_blue,
        gray,
        light_gray,
        roboto,
        robot_bold,
        open_sans,
        size,
        center,
        white,
        archivo_bold,
        arial_bold,
        avarage_sans,
        semi_black,

        ...rest
    } = props

    const textStyle = [
        style,
        
        roboto && styles.roboto,
        robot_bold && styles.robot_bold,
        open_sans && styles.open_sans,
        archivo_bold && styles.archivo_bold,
        arial_bold && styles.arial_bold,
        avarage_sans && styles.avarage_sans,

        size && {fontSize : size},

        center && {textAlign: 'center'},


        title && styles.title,
        white && styles.white,
        light_blue && styles.light_blue,
        light_gray && styles.light_gray,
        gray && styles.gray,
        semi_black && styles.semi_black,

    ];

    return(
        <Text style={[styles.text,textStyle]} {...rest}/>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: theme.font.TEKO,
        fontSize: theme.size.normal,
    },

    title: {fontSize: theme.size.title},
    roboto: {fontFamily: theme.font.ROBOTO},
    robot_bold: {fontFamily: theme.font.ROBOTO_BOLD},
    arial_bold: {fontFamily: theme.font.ARIAL_BOLD},
    open_sans: {fontFamily: theme.font.OPEN_SANS},
    avarage_sans: {fontFamily: theme.font.AVARAGE_SANS_REGULAR},
    archivo_bold: {fontFamily: theme.font.ARCHIVO_BOLD},

    white : {color: 'white'},
    light_blue : {color: theme.color.light_blue},
    gray: {color: theme.color.gray},
    light_gray : {color: theme.color.light_gray},
    semi_black : {color: theme.color.semi_black},
});