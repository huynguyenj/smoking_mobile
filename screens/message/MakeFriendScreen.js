import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator, FlatList, Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import ReactNativeModal from 'react-native-modal';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import privateApiService from '../../services/userPrivateApi';
import { friendStyle } from '../../styles/friendStyle';
import Avatar from '../../assets/avatar.jpg'
import Toast from 'react-native-toast-message';

export default function MakeFriendScreen({visible, onClose, onRefresh, friendList}) {
  const [text, setText] = useState(null)
  const [friends, setFriends] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const debounceFn = useMemo(() => debounce(async (value) => {
    try {
      setFriends([])
      setIsLoading(true)
      const response = await privateApiService.searchFriend(value)
      setFriends(response.data)
      setText('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, 1000), [text])
  useEffect(() => {
    if (text) {
      debounceFn(text)
    }
    return () => {
      debounceFn.cancel()
    }
  }, [text])
  const handleAddFriend = async (friendId) => {
    try {
       await privateApiService.addFriend(friendId)
       Toast.show({
                        type: 'success',
                        text1: 'Add friend successful',
                        text1Style: { fontSize: 16 },
                        visibilityTime: 2000,
                        position:'top'
                      })
        onClose()
        onRefresh()
        
    } catch (error) {
        Toast.show({
                       type: 'error',
                       text1: 'Error',
                       text1Style: { fontSize: 16 },
                       text2: error,
                       text2Style: { fontSize: 14 },
                       visibilityTime: 2000,
                       position:'top'
                })
    }
  }
  return (
   <ReactNativeModal animationIn='slideInUp' animationOut='slideOutDown' isVisible={visible} onBackdropPress={onClose} onSwipeComplete={onClose} swipeDirection='down' style={style.modal}>
    <KeyboardAvoidingView style={style.container}  behavior={Platform.OS === "ios" ? "padding" : 'height'}>
      <TouchableOpacity onPress={onClose} style={style.button}>
        <AntDesign name="closecircle" size={30} color="black" />
      </TouchableOpacity>
      <TextInput value={text} onChangeText={setText} style={style.input} placeholder='Friend name' placeholderTextColor='gray'/>
    {isLoading && 
      <ActivityIndicator size='large' color='black'/>
    }
    {friends?.length > 0 && 
      <>
       <FlatList
          data={friends}
          renderItem={({item}) => (
             <View style={style.friendContainerOutSide}>
                    <View style={style.friendContainer}>
                      <Image source={item.image_url?{uri: item.image_url } : Avatar} style={friendStyle.image}/>
                      <Text style={friendStyle.name}>{item.user_name}</Text>
                    </View>
                    {friendList.includes(item._id) ? 
                    <></>
                    : 
                    <TouchableOpacity onPress={() => handleAddFriend(item._id)}>
                      <AntDesign name="adduser" size={24} color="black" />
                    </TouchableOpacity>
                  }
              </View>
          )}
       />
      </>
    }
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
    marginVertical:10,
    height: 50,
    borderWidth:1,
    padding: 5,
    borderRadius: 10,
    color:'black'
  },
  friendContainerOutSide: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  friendContainer: {
     height: 70,
     flexDirection:'row' ,
     alignItems:'center',
     gap: 15
  }
})