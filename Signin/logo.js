import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Logo() {
    return (
        <>
            <Text style={styles.main}>SimplePlan</Text>
            <Text style={styles.sub}>A no fuss day planning app</Text>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        fontSize: 40,
        width: '100%',
        color: '#F2EBDC',
        fontWeight: '200',
        textAlign: 'center',
    },
    sub: {
        fontSize: 12,
        width: '100%',
        marginBottom: 36,
        color: '#66705B',
        opacity: 0.75,
        textAlign: 'center',
    }
});