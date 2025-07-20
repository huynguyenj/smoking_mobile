import { StyleSheet } from "react-native";

export const initialCardStyle = StyleSheet.create({
      container:{
            backgroundColor:'white',
            marginVertical: 10,
            marginHorizontal: 10,
            padding: 25,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
            borderRadius: 16
      },
      deleteBtn: {
            backgroundColor:'red',
            padding: 10,
            borderBottomLeftRadius: 20,
            borderTopRightRadius:20,
            width: 100,
            right:0,
            position:'absolute'
      }
})