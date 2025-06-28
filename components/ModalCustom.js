import { View, Text, Button, TouchableOpacity } from 'react-native'
import { modalStyle } from '../styles/modalStyle'

export default function ModalCustom({close, agree, title, children, haveButton}) {
  return (
      <View style={modalStyle.container}>
          <View style={modalStyle.subContainer} />
          <View style={modalStyle.sectionContainer}>
            <Text style={modalStyle.title}>{title}</Text>
              {children}
              {haveButton ? <View style={modalStyle.buttonContainer}>
              <TouchableOpacity style={modalStyle.cancelButton} onPress={close}>
                <Text style={modalStyle.textButton}>Cancel</Text>
              </TouchableOpacity>
                 <TouchableOpacity style={modalStyle.okButton} onPress={agree}>
                <Text style={modalStyle.textButton}>Ok</Text>
              </TouchableOpacity>
            </View>: ''}
            
          </View>
        </View>
  )
}