import React from 'react';
import { Animated } from 'react-native';

export default function useTodoAnimation() {
    const height = [new Animated.Value(100), new Animated.Value(100), new Animated.Value(100)];
    const slideLeft = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];
    const slideUp = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];

    const animations = [
        {
            animatedValues: height,
            initialValue: 100
        },
        {
            animatedValues: slideLeft,
            initialValue: 0
        },
        {
            animatedValues: slideUp,
            initialValue: 0
        }
    ];
    try {
        const moveBox = index => [
            Animated.timing(height[index], {
                toValue: 90,
                duration: 400
            }),
            Animated.timing(slideLeft[index], {
                toValue: -500,
                duration: 800
            }),
        ];
        const shiftRemainderBoxes = [
            Animated.timing(slideUp[1], {
                toValue: -100,
                duration: 800
            }),      
            Animated.timing(slideUp[2], {
                toValue: -100,
                duration: 800
            }),
        ];

        const shiftLastBox = [
            Animated.timing(slideUp[2], {
                toValue: -200,
                duration: 800
            })
        ];

        const resetBoxPositions = [];
        animations.forEach(animation => {
            animation.animatedValues.forEach(animatedValue => {
                resetBoxPositions.push(
                    Animated.timing(animatedValue, {
                        toValue: animation.initialValue,
                        duration: 0
                    })
                );
            })
        })

        React.useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.delay(1000),
                    Animated.stagger(100, moveBox(0)),
                    Animated.parallel(shiftRemainderBoxes),
                    Animated.stagger(100, moveBox(1)),
                    Animated.parallel(shiftLastBox),
                    Animated.stagger(100, moveBox(2)),
                    Animated.delay(300),
                    Animated.parallel(resetBoxPositions),
                    Animated.delay(300),
                ]),
                { iterations: -1 }
            ).start();
        }, []);
    } catch (err) {
        console.log({ err, height, slideUp, slideLeft });
    }
    return { height, slideUp, slideLeft }
}