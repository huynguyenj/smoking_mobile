import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import TabNavigator from './TabNavigator'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import { useUserInfoStorage } from '../store/authStore'
import { useEffect, useState } from 'react'

const Stack = createNativeStackNavigator()
export default function StackNavigator() {
  const token = useUserInfoStorage((state) => state.token)

  useEffect(() => {
    const loadToken = async () => {
      await useUserInfoStorage.getState().getToken()
    }
    loadToken()
  }, [])
  return (
    <Stack.Navigator>
      {token ? 
      <Stack.Screen options={{headerShown: false}} name='MainScreen' component={TabNavigator}/>
      :
      <>
      <Stack.Screen options={{headerShown: false}} name='Login' component={LoginScreen}/>
      <Stack.Screen options={{headerShown: false}} name='Register' component={RegisterScreen}/>
      </>

    }
    </Stack.Navigator>
  )
}