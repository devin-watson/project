import React, { useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Auth } from 'aws-amplify';
import PrimaryButton from './primaryButton';
import SecondaryButton from './secondaryButton';
import HeadingOne from './headingOne';
import useTodoAnimation from './useTodoAnimation';
import DismissKeyboard from './dismissKeyboard';
import Media from './media';

const heading = {
    new: 'Create an account',
    existing: 'Welcome back!'
};
const secondaryButtonPre = {
    new: 'Already have an account?',
    existing: 'You\'re new?'
};
const secondaryButtonLabel = {
    new: 'Log in',
    existing: 'Create a new account'
};

const primaryButtonLabel = {
    new: 'Sign up',
    existing: 'Log in'
};

const INITIAL_FORM_Y_AXIS = 180;

export default function Signin() {
    const [ account, setAccount ] = useState('existing');
    const [ status, setStatus ] = useState(null);
    const [ confirmPassword, setConfirmPassword ] = useState(false);
    const [ email, setEmail ] = useState(null);
    const [ name, setName ] = useState(null);
    const [ password, setPassword ] = useState(false);
    
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
    async function signUp() {
        try {
            const user = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    name,
                }
            });
            console.log(user);
        } catch(error) {
            console.info({ error });
            setStatus('error')
        }
    }

    const handleSignIn = () => {
        signIn();
    }
    const handleSignUp = () => {
        if (password === confirmPassword) {
            signUp();
        }
    }

    const handleSubmitForm = () => {
        setStatus('loading');
        if (account === 'new') {
            handleSignUp();
        } else {
            handleSignIn();
        }
    }

    const editable = status !== 'loading';
    const animationValues = useTodoAnimation();

    const formYAxis = useRef(new Animated.Value(INITIAL_FORM_Y_AXIS)).current;

    const onChangeForm = () => {
        if (account === 'new') {
            setAccount('existing');
            Animated.timing(formYAxis, {
                toValue: INITIAL_FORM_Y_AXIS,
                duration: 367,
                useNativeDriver: true,
            }).start();
        } else {
            setAccount('new');
            Animated.timing(formYAxis, {
                toValue: 0,
                duration: 367,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                {// eslint-disable-next-line no-undef
                    <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <SafeAreaView style={{ height: '30%' }}>
                            <Media animationValues={animationValues} />
                        </SafeAreaView>
                        <Animated.View style={{ height: '70%', transform: [ { translateY: formYAxis } ] ,...styles.form }}>
                            <View style={styles.marginBottomMediumPlus}>
                                <HeadingOne customStyles={styles.marginBottomLarge}>{heading[account]}</HeadingOne>
                                {
                                    account === 'existing'
                                    ? null
                                    : (
                                        <>
                                            <View style={styles.formFieldGroup}>
                                                <Text style={styles.formLabel}>Preferred name</Text>
                                                <TextInput 
                                                    style={input.root}
                                                    autoCapitalize="words"
                                                    keyboardAppearance="dark" 
                                                    returnKeyType="next"
                                                    onSubmitEditing={() => { emailRef.current.focus()}}
                                                    onChangeText={value => { setName(value) }}
                                                    editable={editable}
                                                    enablesReturnKeyAutomatically
                                                    selectionColor='#7F8C72'
                                                />
                                            </View>
                                        </>
                                    )
                                }
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
                                {
                                    account === 'existing'
                                    ? null
                                    : (
                                        <>
                                            <View style={styles.formFieldGroup}>
                                                <Text style={styles.formLabel}>Confirm password</Text>
                                                <TextInput 
                                                    ref={passwordInputRef} 
                                                    onChangeText={value => { setConfirmPassword(value) }} 
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
                                        </>
                                    )
                                }
                            </View>
                        </Animated.View>
                    </KeyboardAvoidingView>
                }
                <SafeAreaView style={styles.formButtonWrapper}>
                    <PrimaryButton 
                        disabled={!editable} 
                        onPress={handleSubmitForm}
                        label={primaryButtonLabel[account]}
                    />
                    <SecondaryButton
                        pre={secondaryButtonPre[account]}
                        disabled={!editable} 
                        onPress={onChangeForm}
                        label={secondaryButtonLabel[account]}
                    />
                </SafeAreaView>
            </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    formButtonWrapper: {
        alignItems: 'stretch',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
    },
    marginBottomLarge: {
        marginBottom: 36,
    },
    container: {
        flex: 1,
        backgroundColor: '#D9A08B',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },
    inner: {
        width: '100%',
        height: '100%',
    },
    form: {
        width: '100%',
        paddingHorizontal: 32,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#66705B',
        paddingTop: 55,
        paddingBottom: 24,
    },
    formFieldGroup: {
        width: '100%',
        marginBottom: 16,
    },
    formLabel: {
        color: '#F2EBDC',
        opacity: 0.75,
        marginBottom: -16,
    },
});

const input = StyleSheet.create({
    root: {
        borderBottomColor: 'rgba(127,140,114,0.5)',
        borderBottomWidth: 1,
        width: '100%',
        height: 52,
        fontSize: 20,
        color: '#F2EBDC',
        paddingTop: 16
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