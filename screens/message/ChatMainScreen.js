import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import privateApiService from '../../services/userPrivateApi'
import LoadingCircle from "../../components/LoadingCircle"
import FriendContainer from './FriendContainer'
import AntDesign from '@expo/vector-icons/AntDesign'
import { chatStyle } from '../../styles/chatStyle'
import MakeFriendScreen from './MakeFriendScreen'
import useOpen from '../../hooks/open/useOpen'
export default function ChatMainScreen() {
  const [friendList, setFriendList] = useState(null)
  const [friendIds, setFriendIds] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, handleClose, handleOpen} = useOpen()

  const getFriends = async () => {
            try {
              setIsLoading(true)
              const response = await privateApiService.getFriendsList()
              setFriendList(response.data)
              const friendId = response.data.map((item) => item._id)
              setFriendIds(friendId)    
            } catch (error) {
                  
            } finally {
              setIsLoading(false)
            }
      }
  useFocusEffect(useCallback(() => {
      getFriends()
  },[]))
  if (isLoading) return <LoadingCircle/>
  return (
    <View style={chatStyle.container}>
      <TouchableOpacity style={chatStyle.buttonAdd} onPress={() => handleOpen()}>
            <AntDesign name="pluscircle" size={24} color="white" />
            <Text style={chatStyle.buttonText}>Add friend</Text>
      </TouchableOpacity>
      <FlatList data={friendList} renderItem={({item}) => (
            <FriendContainer friendInfo={item}/>
      )}/>
      <MakeFriendScreen onClose={handleClose} visible={isOpen} onRefresh={getFriends} friendList={friendIds}/>
    </View>
  )
}