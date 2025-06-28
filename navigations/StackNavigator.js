import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import TabNavigator from './TabNavigator'

const Stack = createNativeStackNavigator()
export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name='MainScreen' component={TabNavigator}/>
    </Stack.Navigator>
  )
}