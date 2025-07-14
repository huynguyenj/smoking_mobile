import { View, Text, Image, TouchableOpacity } from 'react-native'
import { friendStyle } from '../../styles/friendStyle'
import Avatar from '../../assets/avatar.jpg'
import { useNavigation } from '@react-navigation/native'
export default function FriendContainer({friendInfo}) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={friendStyle.container} onPress={() => navigation.navigate('Friend', {friend: friendInfo})}>
        <Image source={friendInfo.image_url?{uri: friendInfo?.image_url } : Avatar} style={friendStyle.image}/>
        <Text style={friendStyle.name}>{friendInfo.user_name}</Text>
    </TouchableOpacity>
  )
}