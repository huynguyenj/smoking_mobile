import { useNavigation } from '@react-navigation/native'
import publicApiService from '../../services/apiPublic'
import Toast from 'react-native-toast-message'
import useLoading from '../loading/useLoading'

export default function useRegister() {
    const {isLoading, setIsLoading} = useLoading()
    const navigate = useNavigation()
    const handleRegister = async (email, password, fullName, userName) => {
      try {
       setIsLoading(true)
       const sendData = {
         email: email,
         password: password,
         full_name: fullName,
         user_name: userName
       }
       await publicApiService.register(sendData)
       Toast.show({
                  type: 'success',
                  text1: 'Register Successful',
                  text1Style: { fontSize: 20 },
                  text2: 'Welcome!',
                  text2Style: { fontSize: 16 },
                  visibilityTime: 2000,
                  position:'top'
      }) 
      navigate.navigate('Login')
      } catch (error) {
       Toast.show({
                  type: 'error',
                  text1: 'Failed to Register',
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
  return {isLoading, handleRegister}
}