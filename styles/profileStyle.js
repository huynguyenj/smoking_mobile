import { StyleSheet } from "react-native";

export const profileStyle = StyleSheet.create({
      infoContainer: {
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:10,
            paddingVertical:15,
            gap:10,
            borderWidth: 1,
            borderColor:'white',
            borderTopWidth:0
      },
      image: {
            width: 70,
            aspectRatio: 1,
            borderRadius: 35,
            resizeMode: 'cover'
      },
      nameContainer: {
            flexDirection:'row',
            gap: 10
      },
      nameSize: {
            fontSize: 18
      },
      achievementContainer: {
            flexDirection:'row',
            gap: 10,
            justifyContent:'space-around',
            alignItems:'center',
            marginVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            paddingVertical:15
      },
      achievementContainerTitle: {
            flexDirection:'column',
            gap:5,
            justifyContent:'center',
            alignItems:'center'
      },
      achievementTitle: {
            fontSize: 18
      },
      achievementInformationText: {
            fontSize: 16,
            fontWeight:'600',
            textAlign:'center',
            color:'black',
            backgroundColor:'#ececec',
            width:'100%',
            paddingVertical:8,
            paddingHorizontal: 5,
            borderRadius: 10,
            margin:'auto',
            marginVertical:5

      },
      logoutButton: {
            width: 150,
            margin: 'auto',
            paddingVertical: 10,
            borderRadius: 15,
            backgroundColor:'#272343'
      },
      profileContainer:{
            backgroundColor:'#ececec',
            marginVertical: 5,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 15,
            width: '95%',
            margin: 'auto'
      },
      profileTitle: {
            fontSize: 20,
            fontWeight:"600",
            color:'black',
            marginBottom: 10
      },
      profileInfoContainer: {
            flexDirection:'row',
            gap: 10,
            marginVertical: 5
      },
      textProfile: {
            fontSize: 17,
            color:'black'
      },
      membershipContainer: {
            backgroundColor:'#bbe4e9',
            width: '95%',
            margin: 'auto',
            borderRadius: 10,
            padding: 15
      },
      membershipText: {
            fontSize:17,
            fontWeight:'600',
            color:'white'
      },
      premiumMember: {
            backgroundColor:'#ff9a3c'
      }
})