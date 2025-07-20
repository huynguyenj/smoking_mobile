import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import useOpen from '../../hooks/open/useOpen';
import QuizPopup from '../../components/popup/QuizPopup';
import privateApiService from '../../services/userPrivateApi';
import Toast from 'react-native-toast-message';
import LoadingCircle from '../../components/LoadingCircle';

export default function CreateInitial({visible, onClose, onRefresh}) {
  const {isOpen, toggle} = useOpen()
  const [result, setResult] = useState()
  const [amount, setAmount] = useState(0)
  const [smokeFrequency, setSmokeFrequency] = useState(0)
  const [money, setMoney] = useState(0)
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const handleSubmit = async () => {
      if (validate()) {
      try {
        setIsLoading(true)
        const data = {
            amount_cigarettes: Number(amount),
            smoking_frequency_per_day: Number(smokeFrequency),
            money_each_cigarette: Number(money),
            nicotine_evaluation: Number(result)
        }
        await privateApiService.createInitialState(data)
         Toast.show({
            type: "success",
            text1: "Create Successful",
            text1Style: { fontSize: 20 },
            visibilityTime: 2000,
            position: "top",
        });
      onClose()
      onRefresh()
      } catch (error) {
           Toast.show({
                        type: 'error',
                        text1: 'Create fail',
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
  const validate = () => {
  const error = {}
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    error.amount = 'Please enter a valid amount'
  }
  if (!smokeFrequency || isNaN(smokeFrequency) || Number(smokeFrequency) <= 0) {
    error.smokeFrequency = 'Please enter a valid smoke frequency'
    
  }
  if (!money || isNaN(money) || Number(money) <= 0) {
    error.money = 'Please enter a valid money'
    
  }
  if (result === undefined || isNaN(result) || Number(result) < 0 || Number(result) > 10) {
    error.result = 'Please do a quiz to test your addiction'
   
  }
  setError(error)
  return Object.keys(error).length === 0
};
  if (isLoading) return <LoadingCircle/>
  return (
    <ReactNativeModal  animationIn='slideInUp' animationOut='slideOutDown' isVisible={visible} onBackdropPress={onClose} onSwipeComplete={onClose} swipeDirection='down' style={style.modal}>
          <KeyboardAvoidingView style={style.container}  behavior={Platform.OS === "ios" ? "padding" : 'height'}>
      <TouchableOpacity onPress={onClose} style={style.button}>
            <AntDesign name="closecircle" size={30} color="black" />
      </TouchableOpacity>
      <View style={style.titleContainer}>
            <Text style={{textAlign: 'center', fontSize:15, color:'white', fontWeight: 'bold'}}>Create initial cigarette</Text>
      </View>
      <View>
            <View>
              <Text style={style.titleInput}>Amount</Text>
              <TextInput style={style.input} onChangeText={(text) => setAmount(text)}/>
              {error?.amount ? <Text style={style.errorText}>{error.amount}</Text> : ''}
            </View>
            <View>
              <Text style={style.titleInput}>Smoke frequency a day</Text>
              <TextInput style={style.input} onChangeText={(text) => setSmokeFrequency(text)}/>
              {error?.smokeFrequency ? <Text style={style.errorText}>{error.smokeFrequency}</Text> : ''}

            </View>
             <View>
              <Text style={style.titleInput}>Money each cigarette</Text>
              <TextInput style={style.input} onChangeText={(text) => setMoney(text)}/>
              {error?.money ? <Text style={style.errorText}>{error.money}</Text> : ''}

            </View>
             <View>
              <Text style={style.titleInput}>Nicotine elevation</Text>
              {result===undefined ? 
              <TouchableOpacity onPress={() => toggle()} style={{backgroundColor:'#a393eb', paddingVertical:10, width: 170,paddingHorizontal:15, borderRadius: 10}}>
                  <Text style={{textAlign:'center', color:'white', fontWeight:'500'}}>Test cigarette</Text>
              </TouchableOpacity>
              : 
              <Text style={{color:'#fd5959', fontWeight:'bold'}}>{result}/10</Text>
             }
              <QuizPopup visible={isOpen} onClose={toggle} onResult={(result) => setResult(result)} />
              {error?.result ? <Text style={style.errorText}>{error.result}</Text> : ''}
            </View>
            <TouchableOpacity style={{backgroundColor:'#5fc9f3', marginVertical:15, borderRadius:10, padding:10, justifyContent:'flex-end'}} onPress={() => handleSubmit()}>
              <Text style={{textAlign:'center', color:'white', fontSize:15, fontWeight:'bold'}}>Create</Text>
            </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  )
}

const style = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container:{
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "90%",
    height: "100%",
  },
  button: {
    marginTop: 10,
    marginHorizontal:5
  },
  input:{
    marginVertical:5,
    height: 40,
    borderWidth:1,
    padding: 5,
    borderRadius: 10,
    color:'black'
  },
  titleContainer: {
      backgroundColor: '#3baea0',
      borderRadius: 10,
      padding: 10,
      marginVertical: 10
  },
  errorText: {
      color:'red',
      fontSize: 14,
      fontWeight:'500'
  },
  titleInput: {
      fontSize: 14,
      fontWeight:'500'
  }
})