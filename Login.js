import React, { useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Login() {
    const passwordInputRef = useRef(null);
    const onSubmitEditing = () => {
        passwordInputRef.current.focus();
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading1}>Login</Text>
                <View style={styles.formFieldGroup}>
                    <Text>Email</Text>
                    <TextInput autoCapitalize="none" style={input.root} keyboardType="email-address" keyboardAppearance="dark" returnKeyType="next" onSubmitEditing={onSubmitEditing} />
                </View>
                <View style={styles.formFieldGroup}>
                    <Text>Password</Text>
                    <TextInput ref={passwordInputRef} autoCapitalize="none" style={input.root} secureTextEntry keyboardAppearance="dark" returnKeyType="go" />
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