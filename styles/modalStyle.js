import { StyleSheet } from "react-native";

const buttonWidth = 80
export const modalStyle = StyleSheet.create({
      container: {
            alignContent:'center', 
            flex:1, 
            justifyContent:'center', 
            height:'100%', 
            width:'100%', 
            position:'absolute', 
            zIndex:1
      },
      title: {
            fontSize:18,
            fontWeight:'bold',
            marginBottom:10
      },    
      subContainer:{
            backgroundColor: 'black',
            opacity: 0.5,
            width:'100%',
            height:'100%',
            position:'absolute'
      },
      sectionContainer: {
            backgroundColor:'white', 
            height:'auto', 
            width: '80%', 
            margin:'auto', 
            borderRadius:25, 
            padding:20, 
      },
      checkbox:{
            flexDirection:'row',
            gap: 10,
            marginBottom:5
      },
      checkboxText: {
            fontSize: 15
      },
      buttonContainer: {
            marginTop: 15,
            flexDirection:'row', 
            gap:6, 
            justifyContent:'flex-end'
      },
      cancelButton: {
            width:buttonWidth,
            alignItems:'center', 
            backgroundColor:'red', 
            justifyContent:'center', 
            padding:5, 
            borderRadius:5
      },
      okButton: {
            width:buttonWidth,
            alignItems:'center', 
            backgroundColor:'blue', 
            justifyContent:'center', 
            padding:5, 
            borderRadius:5
      },
      textButton:{
            textAlign:'center', 
            fontWeight:'bold', 
            color:'white'
      }
})