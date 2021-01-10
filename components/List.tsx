import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

function Main(props){
    const {
        style,
        ...rest
    } = props;

    const listStyle = [
        styles.list,
        style
    ];

    return (
        <FlatList
            style={[styles.list,listStyle]}
            {...rest}
        />
    )


}

export default Main;

const styles = StyleSheet.create({
    list: {
    }
});