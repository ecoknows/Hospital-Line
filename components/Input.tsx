import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { theme } from '../constants';


function Main(props){
    const {
        style,
        ...rest
    } = props;

    const inputStyle = [
        style
    ];


    return(
       <TextInput style={[styles.input, inputStyle]} {...rest}/>
    )
}

export default Main;

const styles = StyleSheet.create({
    input: {
        fontFamily: theme.font.AVARAGE_SANS_REGULAR,
    }
})