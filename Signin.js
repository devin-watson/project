import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, SafeAreaView, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Auth } from 'aws-amplify';

const DismissKeyboard = ({ children }) => (
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
    {children}
</TouchableWithoutFeedback>
);

export default function Signin({ navigation }) {
const [status, setStatus] = useState(null);
const [email, setEmail] = useState(null);
const [password, setPassword] = useState(false);

const passwordInputRef = useRef(null);
const emailRef = useRef(null);

async function signIn() {
    try {
        const user = await Auth.signIn(email, password);
        console.log(user);
    } catch(error) {
        console.info({ error });
        setStatus('error')
    }
}

handleSignIn = () => {
    setStatus('loading');
    signIn();
}

const editable = status !== 'loading';

const slideLeftAnim1 = useRef(new Animated.Value(0)).current;
const slideLeftAnim2 = useRef(new Animated.Value(0)).current;
const slideLeftAnim3 = useRef(new Animated.Value(0)).current;

const heightAnim1 = useRef(new Animated.Value(100)).current;
const heightAnim2 = useRef(new Animated.Value(100)).current;
const heightAnim3 = useRef(new Animated.Value(100)).current;

React.useEffect(() => {
    Animated.loop(
        Animated.sequence([
            Animated.delay(500),
            Animated.sequence([
                Animated.timing(slideLeftAnim1, {
                    toValue: -500,
                    duration: 1000
                }),
                Animated.spring(heightAnim1, {
                    toValue: 90,
                    duration: 1000
                }),
            ]),
            Animated.delay(500),
            Animated.sequence([
                Animated.timing(slideLeftAnim2, {
                    toValue: -500,
                    duration: 1000
                }),
                Animated.spring(heightAnim2, {
                    toValue: 90,
                    duration: 1000
                }),
            ]),
            Animated.delay(500),
            Animated.sequence([
                Animated.timing(slideLeftAnim3, {
                    toValue: -500,
                    duration: 1000
                }),
                Animated.spring(heightAnim3, {
                    toValue: 90,
                    duration: 1000
                }),
            ]),
            Animated.delay(500),
        ]),
        {
            iterations: -1
        }
    ).stop();
}, []);
return (
    <DismissKeyboard>
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.formWrapper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <SafeAreaView style={styles.formMedia}>
                    <View style={styles.boxWrapper}>
                        <Text style={styles.heading2}>SimplePlan</Text>
                        <Text style={styles.subHeading}>A no fuss day planning app</Text>
                        <Animated.View style={{
                            ...styles.box,
                            height: heightAnim1,
                            transform: [{
                                translateX: slideLeftAnim1
                            }],
                        }}>
                            <View style={styles.checkbox}></View>
                            <View style={styles.textWrapper}>
                                <View style={styles.text}></View>
                                <View style={styles.secondText}></View>
                            </View>
                        </Animated.View>
                        <Animated.View style={{
                            ...styles.box,
                            height: heightAnim2,
                            transform: [{
                                translateX: slideLeftAnim2
                            }],
                        }}>
                            <View style={styles.checkbox}></View>
                            <View style={styles.textWrapper}>
                                <View style={styles.text}></View>
                                <View style={styles.secondText}></View>
                            </View>
                        </Animated.View>
                        <Animated.View style={{
                            ...styles.box,
                            height: heightAnim3,
                            transform: [{
                                translateX: slideLeftAnim3
                            }],
                        }}>
                            <View style={styles.checkbox}></View>
                            <View style={styles.textWrapper}>
                                <View style={styles.text}></View>
                                <View style={styles.secondText}></View>
                            </View>
                        </Animated.View>
                    </View>
                </SafeAreaView>
                <View style={styles.form}>
                    <Text style={styles.heading1}>Welcome back!</Text>
                    <View style={styles.formFieldGroup}>
                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput 
                            ref={emailRef}
                            style={input.root}
                            autoCapitalize="none"
                            keyboardType="email-address" 
                            keyboardAppearance="dark" 
                            returnKeyType="next" 
                            onSubmitEditing={() => { passwordInputRef.current.focus()}}
                            onChangeText={value => { setEmail(value) }}
                            editable={editable}
                            enablesReturnKeyAutomatically
                            selectionColor='#7F8C72'
                        />
                    </View>
                    <View style={styles.formFieldGroup}>
                        <Text style={styles.formLabel}>Password</Text>
                        <TextInput 
                            ref={passwordInputRef} 
                            onChangeText={value => { setPassword(value) }} 
                            autoCapitalize="none" 
                            style={input.root} 
                            secureTextEntry 
                            keyboardAppearance="dark" 
                            returnKeyType="done" 
                            editable={editable}
                            enablesReturnKeyAutomatically
                            selectionColor='#7F8C72'
                        />
                    </View>
                    <TouchableOpacity 
                        disabled={!editable} 
                        onPress={handleSignIn}
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Sign in</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>You're new?</Text>
                        <TouchableOpacity
                            disabled={!editable} 
                            onPress={() => navigation.navigate('Signup')}
                        >
                            <Text style={styles.link}>Create a new account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    </DismissKeyboard>
)
}

const styles = StyleSheet.create({
heading1: {
    fontSize: 28,
    width: '100%',
    marginBottom: 36,
    color: '#F2EBDC',
    fontWeight: '600',
},
heading2: {
    fontSize: 40,
    width: '100%',
    color: '#F2EBDC',
    fontWeight: '200',
    textAlign: 'center',
},
subHeading: {
    fontSize: 12,
    width: '100%',
    marginBottom: 36,
    color: '#66705B',
    opacity: 0.75,
    textAlign: 'center',
},
container: {
    flex: 1,
    backgroundColor: '#D9A08B',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
},
formWrapper: {
    width: '100%',
    height: '100%'
},
form: {
    width: '100%',
    paddingHorizontal: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#66705B',
    height: '50%',
    paddingTop: 55,
    flex: 1,
},
formFieldGroup: {
    width: '100%',
    marginBottom: 16,
},
formLabel: {
    color: '#F2EBDC',
    opacity: 0.75,
},
button: {
    backgroundColor: '#D9A08B',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginTop: 16,
    borderRadius: 8,
},
secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
},
secondaryButtonText: {
    marginRight: 4,
    color: '#F2EBDC'
},
link: {
    color: '#F2CEAE',
},
formMedia: {
    height: '50%',
},
buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
},
boxWrapper: {
    paddingHorizontal: 24,
    paddingTop: 65,
},
box: {
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
    borderRadius: 4
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

const input = StyleSheet.create({
root: {
    borderBottomColor: 'rgba(127,140,114,0.5)',
    borderBottomWidth: 1,
    width: '100%',
    height: 36,
    fontSize: 20,
    color: '#F2EBDC',
},

});

/**
* #66705B
* #D9A08B
* #F2CEAE
* #F2EBDC
* #7F8C72
* #8C5D61
*/