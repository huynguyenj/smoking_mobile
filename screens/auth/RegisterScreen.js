import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { authStyles } from '../../styles/authStyle';
import { useNavigation } from '@react-navigation/native';
import useRegister from '../../hooks/auth/useRegister';
import LoadingCircle from '../../components/LoadingCircle'
export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullname, setFullName] = useState('');
  const [fullnameError, setFullNameError] = useState('');
  const [username, setUserName] = useState('');
  const [usernameError, setUserNameError] = useState('');
  const {isLoading, handleRegister} = useRegister()
  const navigate = useNavigation();
  const validate = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!fullname) {
      setFullNameError('Fullname is required');
      valid = false;
    } else {
      setFullNameError('');
    }

    if (!username) {
      setUserNameError('Username is required');
      valid = false;
    } else {
      setUserNameError('');

    return valid;
  };
}
  const handleSubmit = async () => {
    if (validate()) {
      await handleRegister(email, password, fullname, username)
    }
  };
  if (isLoading){
    return <LoadingCircle backgroundColor='#3baea0'/>
  }
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Register</Text>
      <TextInput
        style={authStyles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      {emailError ? <Text style={authStyles.error}>{emailError}</Text> : null}
      <TextInput
        style={authStyles.input}
        placeholder="Username"
        value={username}
        autoCapitalize='none'
        onChangeText={setUserName}
      />
      {usernameError ? <Text style={authStyles.error}>{usernameError}</Text> : null}
        <TextInput
        style={authStyles.input}
        placeholder="Full name"
        value={fullname}
        autoCapitalize='none'
        onChangeText={setFullName}
      />
      {fullnameError ? <Text style={authStyles.error}>{fullnameError}</Text> : null}
      <TextInput
        style={authStyles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={authStyles.error}>{passwordError}</Text> : null}
    
      <TouchableOpacity style={authStyles.button} onPress={handleSubmit}>
        <Text style={authStyles.buttonText}>Register</Text>
      </TouchableOpacity>
       <Text style={{textAlign: 'center', marginTop: 20}}>
              Don't have an account? <Text style={{color: 'blue'}} onPress={() => navigate.navigate('Login')}>Login</Text>
            </Text>
    </View>
  );
}