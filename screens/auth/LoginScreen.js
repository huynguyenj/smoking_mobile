import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useUserInfoStorage } from '../../store/authStore';
import useLoading from '../../hooks/loading/useLoading';
import Toast from 'react-native-toast-message';
import publicApiService from '../../services/apiPublic';
import useLogin from '../../hooks/auth/useLogin';
import { useNavigation } from '@react-navigation/native';
import { authStyles } from '../../styles/authStyle';
import LoadingCircle from '../../components/LoadingCircle';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigation()
  const {handleLogin, isLoading} = useLogin()
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

    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setEmailError('');
      setPasswordError('');
      handleLogin(email, password)
    }
  };

  if (isLoading) {
    return <LoadingCircle backgroundColor='#3baea0' />
  }
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Login</Text>
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
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={authStyles.error}>{passwordError}</Text> : null}
      <TouchableOpacity style={authStyles.button} onPress={handleSubmit}>
        <Text style={authStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={{textAlign: 'center', marginTop: 20}}>
        Don't have an account? <Text style={{color: 'blue'}} onPress={() => navigate.navigate('Register')}>Register</Text>
      </Text>
    </View>
  );
}