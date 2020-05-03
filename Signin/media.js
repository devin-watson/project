import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedBoxes from './animatedBoxes';
import Logo from './logo';

export default function Media({ animationValues }) {
    return (
        <>
            <View style={styles.inner}>
                <Logo />
                <AnimatedBoxes {...animationValues} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inner: {
        paddingHorizontal: 24,
        paddingTop: 65,
    }
});