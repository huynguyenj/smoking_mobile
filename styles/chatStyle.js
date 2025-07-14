import { StyleSheet } from "react-native";

export const chatStyle = StyleSheet.create({
      container: {
            paddingVertical: 10,
            paddingHorizontal: 10
      },
      buttonAdd: {
            backgroundColor:'#93e4c1', 
            marginVertical:10, 
            padding:10, 
            borderRadius:10, 
            flexDirection:'row', 
            justifyContent:'center', 
            gap:10
      },
      buttonText:{
            color: 'white', 
            fontWeight:'bold'
      }
})