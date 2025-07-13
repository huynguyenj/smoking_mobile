import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import privateApiService from '../../services/userPrivateApi'
import Toast from 'react-native-toast-message'

export default function CommonProfileUpdate({userInfo, setLoading, onClose, onReload}) {
  const [fullname, setFullName] = useState(userInfo?.full_name)
  const [userName, setUserName] = useState(userInfo?.user_name)
  const handleUpdate = async () => {
      try {
        setLoading(true)
        const data = {
            full_name: fullname,
            user_name: userName
        }
        await privateApiService.updateInformationCommon(data)
        Toast.show({
                          type: 'success',
                          text1: 'Successfully!',
                          text1Style: { fontSize: 20 },
                          text2: 'Update successfully!',
                          text2Style: { fontSize: 16 },
                          visibilityTime: 2000,
                          position:'top'
                        })
        onReload()
        onClose()
      } catch (error) {
      Toast.show({
                             type: 'error',
                             text1: 'Update fail',
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
  return (
    <View style={style.container}>
      <View style={style.inputContainer}>
            <Text style={style.label}>Username</Text>
            <TextInput style={style.input} defaultValue={userInfo?.user_name} onChangeText={(text) => setUserName(text)}/>
      </View>
      <View style={style.inputContainer}>
            <Text style={style.label}>Fullname</Text>
            <TextInput style={style.input} defaultValue={userInfo?.full_name} onChangeText={(text) => setFullName(text)}/>
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
      width: 70,
      padding:5,
      borderRadius:10
   },
   okBtn: {
      backgroundColor:'#5fc9f3',
      width: 70,
      padding:5,
      borderRadius:10
   }
})