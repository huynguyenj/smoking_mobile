import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { formDate } from '../../utils/formDate'
import { initialCardStyle } from '../../styles/intialCard'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import privateApiService from '../../services/userPrivateApi'
import { useState } from 'react'
import LoadingCircle from '../../components/LoadingCircle'

export default function InitialCard({data, onRefresh}) {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState()
  const handleDelete = async () => {
    Alert.alert('Notification', 'Are you sure you want to delete!',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
              try {
                setIsLoading(true)
                await privateApiService.deleteInitialState(data._id)
                Toast.show({
                  type: "success",
                  text1: "Delete successful",
                  text1Style: { fontSize: 20 },
                  visibilityTime: 2000,
                  position: "top",
              });
              onRefresh()
          } catch (error) {
                Toast.show({
                  type: 'error',
                  text1: 'Delete fail',
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
        }
      ]
    )
  
  }
  if (isLoading) return <LoadingCircle/>
  return (
    <TouchableOpacity style={initialCardStyle.container} onPress={() => navigation.navigate('InitialDetail', {id: data._id})}>
      <Text>Amount of cigarettes: {data.amount_cigarettes}</Text>
      <Text>Smoking per day: {data.smoking_frequency_per_day}</Text>
      <Text>Create date: {formDate(data.create_date)}</Text>
      <TouchableOpacity style={initialCardStyle.deleteBtn} onPress={() => handleDelete()}>
        <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}