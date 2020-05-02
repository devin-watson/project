import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Welcome() {
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.heading1}>Welcome</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading1: {
        fontSize: 36,
        width: '100%',
        marginBottom: 48,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inner: {
        padding: 24,
    }
});