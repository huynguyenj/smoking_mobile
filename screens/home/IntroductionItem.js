import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
const listIntroduction = [
      {
      id: 1,
      title: 'Introduction to Smoking Cessation',
      description: 'Learn about the importance of quitting smoking and the benefits of a smoke-free life.',
      imageUrl: 'https://www.keckmedicine.org/wp-content/uploads/2017/08/cigarette_smoking_body_harm.jpg'
      },
      {
      id: 2,
      title: 'Understanding Nicotine Addiction',
      description: 'Explore how nicotine affects your body and mind, and why it is so addictive.',
      imageUrl: 'https://www.breathefree.com/-/media/project/breathefree/images/lung-health/how-to-protect-your-lungs/how-to-protect-your-lungs/new-images/protecting-the-lungs.jpg?h=1027&iar=0&w=1080&updated=20241115055307&hash=B0ACA3E659D5FB9404CF14463B1F0A42'
      },
      {
      id: 3,
      title: 'Strategies for Quitting Smoking',
      description: 'Discover effective strategies and tips to help you quit smoking successfully.',
      imageUrl: 'https://superguy.com.au/wp-content/uploads/2022/07/Best-Superannuation-Strategies.jpg'
      },
]
const Item = ({item}) => (
      <View style={introductionStyle.section}>
            <Image source={{uri: item.imageUrl}} style={introductionStyle.image} alt='image'/>
            <View style={introductionStyle.contentContainer}>
                  <Text style={introductionStyle.title}>{item.title}</Text>
                  <Text style={introductionStyle.description}>{item.description}</Text>
            </View>
      </View>
)
export default function IntroductionItem() {
  const renderItem = ({item}) => {
      return <Item item={item}/> 
  }  
  return (
      <FlatList horizontal showsHorizontalScrollIndicator={false} data={listIntroduction} renderItem={renderItem} contentContainerStyle={introductionStyle.container}/>
  )
}

const introductionStyle = StyleSheet.create({
      container: {
            padding: 10,
            gap:10
      },
      section: {
          position:'relative'  
      },
      image: {
            width: 370,
            height: 270,
            borderRadius: 20,
            resizeMode: 'cover'
      },
      contentContainer: {
            position: 'absolute',
            bottom: 10,
            paddingHorizontal:15
      },
      title: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 5,
            textAlign: 'center',
      },
      description: {
            fontSize: 16,
            color: '#fff',
            textAlign: 'center',
      }

})
