import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function HeadingOne({ children, customStyles, ...rest }) {
    const styles = StyleSheet.create({
        root: {
            fontSize: 28,
            width: '100%',
            marginBottom: 36,
            color: '#F2EBDC',
            fontWeight: '600',
        },
        ...customStyles
    });
    
    return (<Text style={styles.root} {...rest}>{children}</Text>);
}