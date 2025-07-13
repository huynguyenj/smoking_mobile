import { useUserInfoStorage } from '../../store/authStore'
import useLoading from '../loading/useLoading'
import Toast from 'react-native-toast-message'
import publicApiService from '../../services/apiPublic'
import { useNavigation } from '@react-navigation/native'

export default function useLogin() {
  const {isLoading, setIsLoading} = useLoading()
  const {setToken, setUserInfo} = useUserInfoStorage.getState()
  const handleLogin = async (email, password) => {
      try {
        setIsLoading(true)
        const response = await publicApiService.login({email, password})
        setToken(response.data.accessToken)
        setUserInfo(response.data)
        Toast.show({
                  type: 'success',
                  text1: 'Login Successful',
                  text1Style: { fontSize: 20 },
                  text2: 'Welcome back!',
                  text2Style: { fontSize: 16 },
                  visibilityTime: 2000,
                  position:'top'
                })
      } catch (error) {
        Toast.show({
                 type: 'error',
                 text1: 'Authentication Error',
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
  return {handleLogin, isLoading}
}