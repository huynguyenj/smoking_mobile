import { useState } from 'react'
import { View, Text } from 'react-native'
import Toast from 'react-native-toast-message'
import privateApiService from '../../services/userPrivateApi'
import { useNavigation } from '@react-navigation/native'
import { useUserInfoStorage } from '../../store/authStore'

export default function useLogout() {
  const [isLoadingLogout, setIsLoading] = useState(false)
  const{ clearAll} = useUserInfoStorage.getState()
  const handleLogout = async () => {
      try {
         setIsLoading(true)   
         await privateApiService.logout()
         clearAll()
      } catch (error) {
            Toast.show({
                          type: 'error',
                          text1: 'Logout fail',
                          text1Style: { fontSize: 20 },
                          text2: error,
                          text2Style: { fontSize: 16 },
                          visibilityTime: 2000,
                          position:'top'
                  })   
      } finally {
         setIsLoading(false)
      }
  }
  return {isLoadingLogout, handleLogout}
}