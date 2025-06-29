import { View, Text } from 'react-native'
import { homeStyle } from '../../styles/homeStyle'
import IntroductionItem from './IntroductionItem'
import ContentList from './ContentList'

export default function Home() {
  return (
    <View style={homeStyle.container}>
      <View>
        <IntroductionItem/>
      </View>
        <ContentList/>
    </View>
  )
}