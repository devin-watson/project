import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function PrimaryButton({ label, ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <View style={styles.root}>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#D9A08B',
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginTop: 16,
        borderRadius: 8,
    },
    label: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
});