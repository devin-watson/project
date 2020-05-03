import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function SecondaryButton({ label, pre, post, ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <View style={styles.root}>
                <Text style={styles.pre}>{pre}</Text>
                    <View>
                        <Text style={styles.label}>{label}</Text>
                    </View>
                <Text style={styles.post}>{post}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginTop: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pre: {
        marginRight: 4,
        color: '#F2EBDC'
    },
    post: {
        marginLeft: 4,
        color: '#F2EBDC'
    },
    label: {
        color: '#F2CEAE',
    },
});