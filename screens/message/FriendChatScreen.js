import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, StyleSheet } from 'react-native'
import privateApiService from '../../services/userPrivateApi'
import LoadingCircle from "../../components/LoadingCircle"
import ChatSection from './ChatSection'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useMessage from '../../hooks/message/useMessage'
import AntDesign from '@expo/vector-icons/AntDesign'
import { generateRoomId } from '../../utils/generateRoomId'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../../assets/avatar.jpg'
export default function FriendChatScreen({route}) {
  const { friend } = route.params
  const [messages, setMessages] = useState(null)
  const scroller = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState(null)
  const { socket, setRoomId } = useMessage()
  const navigation = useNavigation()
  useEffect(() => {
        const getMessage = async () => {
              try {
                    setIsLoading(true)
                    const response = await privateApiService.getMessageHistory(friend._id)
                    setMessages(response.data)
                    setRoomId(generateRoomId(response?.data.user_info._id, response?.data.friend_info._id))
            } catch (error) {
                  
            } finally {
              setIsLoading(false)
            }
      }
      getMessage()
  },[])
  useEffect(() => {
      if (!socket) return
      socket.on('received-message', (newMessage) => {
            console.log(newMessage)
            setMessages((prev) => ({
            ...prev, result: [...(prev?.result || []), newMessage],
            }));
      })
      return () => {
            socket.off('received-message')
      }
  }, [socket])

  const sendMessage = async () => {
   if (text) {
      const sendMess = {
            sender_id: messages.user_info._id,
            receiverId: messages.friend_info._id,
            text: text
      }
      socket?.emit('send-message', sendMess)
      setText('')
   }
  }
  if (isLoading) return <LoadingCircle/>
  
  return (
      
    <SafeAreaView style={{flex: 1}}>
      <View style={style.infoContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Image source={messages?.friend_info.image_url ? {uri: messages.friend_info.image_url} : Avatar} style={style.image}/>
            <Text>{messages?.friend_info.user_name}</Text>
      </View>
      <FlatList ref={scroller} data={messages?.result} renderItem={({item}) => (
            <ChatSection userInfo={messages.user_info} friendInfo={messages.friend_info} messageHistory={item}/>
      )}
      onContentSizeChange={() => scroller.current.scrollToEnd({animated: true}) }
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'height'}>
      <View style={{height:50, borderWidth:1, borderRadius: 10, marginBottom:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10}}>
        <TextInput value={text} onChangeText={setText} style={{width:'90%'}}/>
        <TouchableOpacity onPress={sendMessage}>
            <FontAwesome name="send" size={24} color="#0092ca" />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
      infoContainer: {
            borderBottomWidth: 1,
            borderBottomColor:'gray',
            paddingVertical:10,
            paddingHorizontal: 10,
            flexDirection:'row',
            alignItems:'center',
            marginBottom: 10,
            gap: 10
      },
      image: {
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: 'cover'  
      }
})