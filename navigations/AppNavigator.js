import { NavigationContainer } from '@react-navigation/native'
import { View, Text } from 'react-native'
import StackNavigator from './StackNavigator'
import Toast from 'react-native-toast-message'

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator/>
      <Toast/>
    </NavigationContainer>
  )
}