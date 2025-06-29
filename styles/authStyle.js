import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor:'#3baea0' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    textAlign: 'center' ,
    color:'white'
  },
  input: { 
    borderWidth: 1, 
    borderColor: 'white', 
    borderRadius: 6, 
    padding: 12, 
    marginBottom: 10 ,
    color:'white'
  },
  error: { 
    color: 'red', 
    fontWeight:'bold',
    marginBottom: 10, 
  },
  button: {
    backgroundColor: '#93e4c1', 
    padding: 12, 
    borderRadius: 6, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 16
  },
}
);