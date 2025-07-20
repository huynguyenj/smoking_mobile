import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import privateApiService from '../../services/userPrivateApi'
import Toast from 'react-native-toast-message'
import DateTimePicker from '@react-native-community/datetimepicker'
import useOpen from '../../hooks/open/useOpen'
export default function ProfileUpdate({userInfo, setLoading, onClose, onReload}) {
  const profile = userInfo?.profile || {}
  const [address, setAddress] = useState(profile.address || '')
  const [age, setAge] = useState(profile.age?.toString() || '')
  const [experience, setExperience] = useState(profile.experience || '')
  const [birthdate, setBirthdate] = useState(profile.birthdate ? new Date(profile.birthdate) : new Date())
  const {isOpen, toggle} = useOpen()
  const handleUpdate = async () => {
      try {
        setLoading(true)
        const data = {      
            experience: experience,
            birthdate: birthdate.getTime(),
            age: Number(age),
            address: address
        }
        await privateApiService.updateProfile(data)
        Toast.show({
                          type: 'success',
                          text1: 'Successfully',
                          text1Style: { fontSize: 20 },
                          text2: 'Update profile successful',
                          text2Style: { fontSize: 16 },
                          visibilityTime: 2000,
                          position:'top'
                        })
        onReload()
        onClose()
      } catch (error) {
      Toast.show({
                             type: 'error',
                             text1: 'Error',
                             text1Style: { fontSize: 20 },
                             text2: error,
                             text2Style: { fontSize: 16 },
                             visibilityTime: 2000,
                             position:'top'
                           })
      } finally {
            setLoading(false)
      }
  }
  const handleChangeDate = (e, date) => {
      setBirthdate(date)
      toggle()
  }
  return (
  <View style={style.container}>
        <View style={style.inputContainer}>
              <Text style={style.label}>Address</Text>
              <TextInput style={style.input} defaultValue={address} onChangeText={(text) => setAddress(text)}/>
        </View>
        <View style={style.inputContainer}>
              <Text style={style.label}>Age</Text>
              <TextInput style={style.input} defaultValue={age} onChangeText={(text) => setAge(text)}/>
        </View>
        <View style={style.inputContainer}>
              <Text style={style.label}>Experience</Text>
              <TextInput style={style.input} defaultValue={experience} onChangeText={(text) => setExperience(text)}/>
        </View>
        <View>
              <Text style={style.label}>Birthdate</Text>
              <Text style={{marginBottom: 10}}>{birthdate.toLocaleDateString()}</Text>
            <Button title='Change your birthdate' onPress={toggle}/>
            {isOpen && 
              <DateTimePicker value={birthdate} mode='date' onChange={handleChangeDate}/>
            }
        </View>
        <View style={style.buttonContainer}>
              <TouchableOpacity style={style.cancelBtn} onPress={onClose}>
                    <Text style={{textAlign:'center', color:'#5c5470', fontWeight:'bold'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.okBtn} onPress={handleUpdate}>
                    <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Save</Text>
              </TouchableOpacity>
        </View>
      </View>
  )
}

const style = StyleSheet.create({
   container: {
      marginVertical: 5
   },
   inputContainer: {
      marginVertical: 5
   },
   label: {
      fontWeight:'bold'
   },
   input:{
      borderWidth: 1,
      borderRadius: 5,
      padding: 10
   },
   buttonContainer: {
      flexDirection:'row',
      gap: 20,
      justifyContent:'flex-end',
      marginVertical: 10
   },
   cancelBtn: {
      backgroundColor:'#d3d6db',
      width: 90,
      padding:5,
      borderRadius:10
   },
   okBtn: {
      backgroundColor:'#5fc9f3',
      width: 90,
      padding:5,
      borderRadius:10
   }
})