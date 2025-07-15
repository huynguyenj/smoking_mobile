import { View, Text, StyleSheet } from 'react-native'

export default function ChatSection({userInfo, messageHistory}) {
  return (
    <View style={[userInfo?._id === messageHistory.sender_id ? {alignItems:'flex-end'} : {alignItems:'flex-start'}, {paddingHorizontal:10}]} >
      <Text style={userInfo?._id === messageHistory.sender_id ? style.sender : style.receiver}>{messageHistory.content}</Text>
    </View>
  )
}

const style = StyleSheet.create({
      sender: {
            paddingHorizontal:10,
            paddingVertical:10,
            marginBottom:10,
            borderRadius: 10,
            backgroundColor:'#00bbf0',
            width: 130,
            color:'white'
      },
      receiver: {
            paddingHorizontal:10,
            paddingVertical:7,
            marginBottom:10,
            borderRadius: 10,
            backgroundColor:'#dbd8e3',
            width: 130,
            color:'black'
      }
})