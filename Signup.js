import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Auth } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        {children}
    </TouchableWithoutFeedback>
);

export default function Signup({ navigation }) {
    const [status, setStatus] = useState(null);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(false);
    const [code, setCode] = useState(false);

    const passwordInputRef = useRef(null);
    const emailRef = useRef(null);

    async function signUp() {
        try {
            const data = await Auth.signUp({
                username: email,
                password,
            });
            if (data.user) {
                setStep(2);
                setStatus(null);
            } else {
                setStatus('error')
            }
        } catch(error) {
            console.info({ error });
            setStatus('error')
        }
    }
    async function confirmSignUp() {
        try {
            const confirmation = await Auth.confirmSignUp(email, code);
            if (confirmation  === 'SUCCESS') {
                navigation.navigate('Welcome');
                setStatus(null);
            } else {
                setStatus('error');
            }
        } catch(error) {
            console.info({ error });
            setStatus('error')
        }
    }

    handleSignUp = () => {
        setStatus('loading');
        signUp();
    }

    handleConfirmSignUp = () => {
        setStatus('loading');
        confirmSignUp();
    }

    const editable = status !== 'loading';

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.formWrapper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <View style={styles.form}>
                        <Text style={styles.heading1}>Welcome back!</Text>
                        {step === 1 ? (
                            <>
                                <View style={styles.formFieldGroup}>
                                    <Text>Email</Text>
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
                                        selectionColor="#456665"
                                    />
                                </View>
                                <View style={styles.formFieldGroup}>
                                    <Text>Password</Text>
                                    <TextInput 
                                        ref={passwordInputRef} 
                                        onChangeText={value => { setPassword(value) }} 
                                        autoCapitalize="none" 
                                        style={input.root} 
                                        secureTextEntry 
                                        keyboardAppearance="dark" 
                                        returnKeyType="done" 
                                        onSubmitEditing={handleSignUp}
                                        editable={editable}
                                        enablesReturnKeyAutomatically
                                        selectionColor="#456665"
                                    />
                                </View>
                            </>
                        ) : (
                            <View style={styles.formFieldGroup}>
                                <Text>Confirmation code</Text>
                                <TextInput 
                                    style={input.root}
                                    autoCapitalize="none"
                                    keyboardAppearance="dark" 
                                    returnKeyType="go" 
                                    onSubmitEditing={handleConfirmSignUp}
                                    onChangeText={value => { setCode(value) }}
                                    editable={editable}
                                    enablesReturnKeyAutomatically
                                    selectionColor="#456665"
                                />
                            </View>
                        )}
                        <TouchableOpacity 
                            disabled={!editable} 
                            onPress={step === 1 ? handleSignUp : handleConfirmSignUp}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign up</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            disabled={!editable} 
                            onPress={() => navigation.navigate('Signin')}
                        >
                            <View style={styles.secondaryButton}>
                                <Text style={styles.secondaryButtonText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </DismissKeyboard>
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
      height: '100%',
    },
    formWrapper: {
        width: '100%',
    },
    form: {
        width: '100%',
        paddingHorizontal: 32,
    },
    formFieldGroup: {
        width: '100%',
        marginBottom: 36,
    },
    button: {
        backgroundColor: '#456665',
        width: '100%',
        height: 60,
        alignSelf: 'center',
        marginTop: 24,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    secondaryButton: {
        width: '100%',
        height: 60,
        alignSelf: 'center',
        marginTop: 24,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        color: '#456665',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    }
});
  
const input = StyleSheet.create({
    root: {
      borderBottomColor: '#c6c6c6',
      borderBottomWidth: 1,
      width: '100%',
      height: 40,
      fontSize: 20,
    },

});