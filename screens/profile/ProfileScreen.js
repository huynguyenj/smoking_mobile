import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import useLoading from '../../hooks/loading/useLoading'
import privateApiService from '../../services/userPrivateApi'
import Toast from 'react-native-toast-message'
import Avatar from '../../assets/avatar.jpg'
import LoadingCircle from '../../components/LoadingCircle'
import { profileStyle } from '../../styles/profileStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import useLogout from '../../hooks/auth/useLogout'
import { formDate } from '../../utils/formDate'
import useMembership from '../../hooks/membership/useMembership'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalCustom from '../../components/ModalCustom'
import CommonProfileUpdate from './CommonProfileUpdate'
import useOpen from '../../hooks/open/useOpen'
import ProfileUpdate from './ProfileUpdate'
export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState()
  const [achievements, setAchievements] = useState()
  const { isLoading, setIsLoading } = useLoading()
  const {isLoadingLogout,handleLogout} = useLogout()
  const { membershipInfo, setMembershipId } = useMembership()
  const { isOpen, isOpen2, handleClose, handleClose2, handleOpen, handleOpen2  } = useOpen()
  const fetchUserInformation = async () => {
    try {
      setIsLoading(true)
      const response = await privateApiService.getUserInfo()
      const achievementsResponse = await privateApiService.getUserCurrentRank()
      setUserInfo(response.data)
      setAchievements(achievementsResponse.data)
      setMembershipId(response.data.membership.membership_id)
    } catch (error) {
       Toast.show({
                       type: 'error',
                       text1: 'Loading data error',
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
    useFocusEffect(useCallback(() => {
    fetchUserInformation()
  },[])
)
if (isLoading || isLoadingLogout) return <LoadingCircle/>
return (
  <>
  
    <SafeAreaView style={{backgroundColor:'#9fd3c7', flex:1}}>
      {userInfo ? 
      <View>
        <View  style={profileStyle.infoContainer}>
        <Image source={userInfo.image_url?{uri: userInfo?.image_url } : Avatar} style={profileStyle.image}/>
        <View>
        <View style={profileStyle.nameContainer}>
          <Text style={profileStyle.nameSize}>{userInfo.full_name ? userInfo.full_name : 'No name'}</Text>
          <Text style={[{color:'blue'}, profileStyle.nameSize]}>@{userInfo.user_name? userInfo.user_name : 'No user name'}</Text>
          <TouchableOpacity onPress={handleOpen}>
            <FontAwesome name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:15}}>{userInfo.email}</Text>
        <Text style={{fontSize:15, fontWeight:'bold'}}>{userInfo.role}</Text>
        </View>
      </View>
      <View style={profileStyle.achievementContainer}>
        {achievements ? 
        <>
        <View>
          <View style={profileStyle.achievementContainerTitle}>
          <FontAwesome6 name="ranking-star" size={20} color="black" />
          <Text style={profileStyle.achievementTitle}>Position </Text>
          </View>
          <Text style={profileStyle.achievementInformationText}>{achievements.position}th</Text>
         
        </View>
        <View>
          <View style={profileStyle.achievementContainerTitle}>
             <AntDesign name="star" size={20} color="black" />
            <Text style={profileStyle.achievementTitle}>Total star</Text>
          </View>
            <Text style={profileStyle.achievementInformationText}>{achievements.star_count} stars</Text>
         
        </View>
        <View>
          <View style={profileStyle.achievementContainerTitle}>
          <AntDesign name="profile" size={20} color="black" />
          <Text style={profileStyle.achievementTitle}>Total achievements</Text>
          </View>
         <Text style={profileStyle.achievementInformationText}>{achievements.total_achievements}</Text>
        </View>
        </>
        : 
        <View>
          <Text>No achievement</Text>
        </View>
      }
      </View>
      </View>
      : 
      <View>
        <Text>No profile </Text>
      </View>
    }
      <TouchableOpacity onPress={handleLogout} style={profileStyle.logoutButton}>
        <Text style={{textAlign:'center', color:'white', fontSize:17}}>Logout</Text>
      </TouchableOpacity>
      <View style={profileStyle.profileContainer}>
        <Text style={profileStyle.profileTitle}>Profile</Text>
          <TouchableOpacity onPress={handleOpen2} style={{position:'absolute', right: 10, top: 10}}>
            <FontAwesome name="edit" size={24} color="black" />
          </TouchableOpacity>
      {userInfo?.profile ? 
        <View>
        
          <View style={profileStyle.profileInfoContainer}>
            <Entypo name="address" size={24} color="black" />
              <Text style={profileStyle.textProfile}>
                Address: {userInfo.profile.address? userInfo.profile.address : 'Update your address'}
              </Text>
          </View>
           <View style={profileStyle.profileInfoContainer}>
            <FontAwesome name="birthday-cake" size={24} color="black" />
              <Text style={profileStyle.textProfile}>
                Birthdate: {userInfo.profile.birthdate?  formDate(userInfo.profile.birthdate): 'Update your birthdate'}
              </Text>
          </View>
           <View style={profileStyle.profileInfoContainer}>
            <AntDesign name="user" size={24} color="black" />
              <Text style={profileStyle.textProfile}>
                Age: {userInfo.profile.age? `${userInfo.profile.age} years old` : 'Update your age'}
              </Text>
          </View>
            <View style={profileStyle.profileInfoContainer}>
            <FontAwesome6 name="person-chalkboard" size={24} color="black" />
              <Text style={profileStyle.textProfile}>
                Experience: {userInfo.profile.experience? userInfo.profile.experience : 'Update your experience'}
              </Text>
          </View>
        </View>
      : 
      <Text>No profile update</Text>
    }
    </View>
    <View style={[profileStyle.membershipContainer, membershipInfo?.membership_title.toLowerCase() === 'premium' && profileStyle.premiumMember]}>
      <Text style={profileStyle.membershipText}>
        Membership
      </Text>
        <View style={{flexDirection:'row', alignItems:'center', gap: 10, marginVertical:10}}>
          <MaterialIcons name="card-membership" size={24} color="white" />
          <Text style={profileStyle.membershipText}>
            {membershipInfo?.membership_title}
          </Text>
      </View>
    </View>
 
    </SafeAreaView>
    {isOpen && 
    <ModalCustom title='Edit name'>
      <CommonProfileUpdate userInfo={userInfo} setLoading={setIsLoading} onClose={handleClose} onReload={fetchUserInformation}/>
    </ModalCustom>
    }
    {isOpen2 && 
      <ModalCustom>
        <ProfileUpdate onClose={handleClose2} userInfo={userInfo} setLoading={setIsLoading} onReload={fetchUserInformation}/>
      </ModalCustom>
    }
  </>
  )
}