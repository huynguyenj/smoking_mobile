import { View, Text, Image } from 'react-native';
import { headerStyle } from '../styles/headerStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header({title}) {
  return (
    <SafeAreaView style={headerStyle.container}>
      <Image
        source={require('../assets/logo_smoking.png')}
        style={headerStyle.logo}
      />
      <Text style={headerStyle.title}>{title}</Text>
    </SafeAreaView>
  );
}

