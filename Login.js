import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Auth } from 'aws-amplify';

export default function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(false);
    const passwordInputRef = useRef(null);

    async function signUp() {
        try {
            const user = await Auth.signUp({
                username: email,
                password,
            })
            console.log({user});
        } catch(error) {
            console.log({ error });
        }
    }

    const onEditEmail = () => {       
        passwordInputRef.current.focus();
    }
    const onEmailChange = value => {
        setEmail(value);
    }
    const onPasswordChange = value => {
        setPassword(value)
    }
    const onCompleteForm = () => {
        signUp();
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading1}>Sign up</Text>
                <View style={styles.formFieldGroup}>
                    <Text>Email</Text>
                    <TextInput 
                        style={input.root}
                        autoCapitalize="none"
                        keyboardType="email-address" 
                        keyboardAppearance="dark" 
                        returnKeyType="next" 
                        onSubmitEditing={onEditEmail}
                        onChangeText={onEmailChange}
                    />
                </View>
                <View style={styles.formFieldGroup}>
                    <Text>Password</Text>
                    <TextInput 
                        ref={passwordInputRef} 
                        onChangeText={onPasswordChange} 
                        autoCapitalize="none" 
                        style={input.root} 
                        secureTextEntry 
                        keyboardAppearance="dark" 
                        returnKeyType="go" 
                        onSubmitEditing={onCompleteForm}
                    />
                </View>
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
    form: {
        width: '100%',
        padding: 24
    },
    formFieldGroup: {
        marginBottom: 36,
    }
});
  
const input = StyleSheet.create({
    root: {
      borderBottomColor: '#9e9e9e',
      borderBottomWidth: 1,
      width: '100%',
      height: 40,
      fontSize: 20,
    },

});