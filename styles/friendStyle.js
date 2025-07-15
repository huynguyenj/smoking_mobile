import { StyleSheet } from "react-native";

export const friendStyle = StyleSheet.create({
   container: {
      height: 70,
      flexDirection:'row' ,
      alignItems:'center',
      gap: 15
   },
   image: {
      width:50,
      aspectRatio: 1,
      borderRadius: 25
   },
   name: {
      fontSize: 15,
   }
})