import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import Home from '../screens/home/Home'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Header from '../layouts/Header'
import PlanScreen from '../screens/plan/PlanScreen'
import CigaretteScreen from '../screens/cigarettes/CigaretteScreen'
import BlogScreen from '../screens/blog/BlogScreen'
import RankScreen from '../screens/rank/RankScreen'
import Profile from '../screens/profile/ProfileScreen'
import ChatMainScreen from '../screens/message/ChatMainScreen'
import InitialState from '../screens/initial-state/InitialState'
import { useCallback, useState } from 'react'
import { useUserInfoStorage } from '../store/authStore'
import { useFocusEffect } from '@react-navigation/native'
import privateApiService from '../services/userPrivateApi'
const Tab = createBottomTabNavigator()
export default function TabNavigator() {
  const [membership, setMembership] = useState()
  const userInfo = useUserInfoStorage.getState().userInfo
  useFocusEffect(useCallback(() => {
    const getMembership = async () => {
      try {
        const response = await privateApiService.getMemberShipInfo(userInfo?.membership.membership_id)
        setMembership(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMembership()
  },[]))
  
  return (
    <Tab.Navigator 
       screenOptions={({ route }) => ({
        header: () => <Header title={route.name}/>,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
             focused
              ? iconName = <Ionicons name="home" size={30} color="black" />
              : iconName =  <Ionicons name="home-outline" size={30} color="gray" />
          } else if (route.name === 'Plan'){
            focused ? 
            iconName = <MaterialIcons name='schedule' size={30} color='black'/>
            : iconName = <MaterialIcons name='schedule' size={30} color='gray'/>
          } else if (route.name === 'Cigarettes') {
            focused ? 
            iconName = <AntDesign name="hourglass" size={30} color="black" />
            : iconName = <AntDesign name="hourglass" size={30} color="gray" />

          } else if (route.name === 'Blogs') {
            focused ? 
            iconName = <FontAwesome5 name="blogger-b" size={30} color="black" />
            : iconName = <FontAwesome5 name="blogger-b" size={30} color="gray" />
          } else if (route.name === 'Ranking') {
            focused ? 
            iconName = <FontAwesome6 name="ranking-star" size={30} color="black" />
            : iconName = <FontAwesome6 name="ranking-star" size={30} color="gray" />
          } else if( route.name === 'Profile') {
            focused ? 
            iconName = <FontAwesome name="user-circle" size={30} color="black" />
            : iconName = <FontAwesome name="user-circle" size={30} color="gray" />
          } else if (route.name === 'Message' && membership.membership_title.toLowerCase() === 'premium') {
            focused ? iconName = <AntDesign name="message1" size={30} color="black" /> : iconName = <AntDesign name="message1" size={30} color="gray" />
          } else if (route.name === 'State') {
            focused ? iconName = <MaterialIcons name="health-and-safety" size={30} color="black" /> : iconName = <MaterialIcons name="health-and-safety" size={30} color="gray" />
          }
          return iconName
        },
        animation:'shift',
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name='State' component={InitialState}/>
      <Tab.Screen name="Cigarettes" component={CigaretteScreen} />
      <Tab.Screen name="Blogs" component={BlogScreen} />
      <Tab.Screen name="Ranking" component={RankScreen} />
      <Tab.Screen options={{headerShown: false}} name="Profile" component={Profile} />
      {membership?.membership_title.toLowerCase() === 'premium' && 
      <Tab.Screen name="Message" component={ChatMainScreen}/>
      }
    </Tab.Navigator>
  )
}