import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function AnimatedBoxes({ height, slideLeft, slideUp }) {
    
    const boxes = [ { key: 'box1' }, { key: 'box2' }, { key: 'box3' } ];
    return (
        <>
            {boxes.map((box, index) => {
                try {
                    const animatedBoxStyle = {
                        ...styles.root,
                        height: height[index],
                        transform: [
                            { translateX: slideLeft[index] }, 
                            { translateY: slideUp[index] }
                        ],
                    }
                    return (
                        <Animated.View key={box.key} style={animatedBoxStyle}>
                            <View style={styles.checkbox}></View>
                            <View style={styles.textWrapper}>
                                <View style={styles.text}></View>
                                <View style={styles.secondText}></View>
                            </View>
                        </Animated.View>
                    )
                } catch(error) {
                    console.log({ error })
                }
            })}
        </>
    )
}

const styles = StyleSheet.create({ 
    root: {
        backgroundColor: '#F2EBDC',
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        padding: 24,
        flexDirection: 'row'
    },
    checkbox: {
        borderColor: '#D9A08B',
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
    },
    textWrapper: {
        flexDirection: 'column',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    text: {
        height: 1,
        width: 200,
        backgroundColor: '#D9A08B',
        marginLeft: 24,
    },
    secondText: {
        height: 1,
        width: 100,
        backgroundColor: '#D9A08B',
        marginLeft: 24,
    }
});