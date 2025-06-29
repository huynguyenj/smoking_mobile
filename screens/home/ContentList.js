import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const contactList = [
  {
    icon: <AntDesign name="facebook-square" size={30} color="white" />,
    content: 'Facebook',
    backgroundColor: '#1877f3'
  },
  {
    icon: <AntDesign name="instagram" size={30} color="white" />,
    content: 'Instagram',
    backgroundColor: '#f76b8a'
  },
  {
    icon: <MaterialIcons name="email" size={30} color="white" />,
    content: 'Email',
    backgroundColor: '#ea4335'
  },
  {
    icon: <AntDesign name="phone" size={30} color="white" />,
    content: 'Phone',
    backgroundColor: '#34a853'
  },
];
const featureList = [
  {
    icon: <AntDesign name="calendar" size={30} color="white" />,
    title: 'Plan',
    content: 'Create and manage your quit smoking plan with personalized steps.',
    backgroundColor: '#3baea0',
    textColor:'#93e4c1'
  },
  {
    icon: <FontAwesome5 name="medal" size={30} color="white" />,
    title: 'Ranking',
    content: 'See your progress and compare your achievements with others.',
    backgroundColor: '#f6c90e',
    textColor:'#fdffcd'
  },
  {
    icon: <MaterialIcons name="smoking-rooms" size={30} color="white" />,
    title: 'Cigarettes',
    content: 'Track your daily cigarette consumption and set reduction goals.',
    backgroundColor: '#ea5455',
    textColor:'#ffcbcb'
  },
  {
    icon: <AntDesign name="book" size={30} color="white" />,
    title: 'Blog',
    content: 'Read tips, stories, and advice to support your smoke-free journey.',
    backgroundColor: '#1877f3',
    textColor:'#8dc6ff'
  },
];
export default function ContentList() {
 
  return (
    <ScrollView>
      <View style={[contentListStyle.sectionContainer,{marginTop: 30, backgroundColor:'#bae8e8'}]}>
            <Text style={contentListStyle.title}>Contacts</Text>
            <Text style={{textAlign:'center', marginBottom: 10, fontSize:15}}>Contact us to know more about our services</Text>
            <View style={contentListStyle.containerContent}>
             {contactList.map((item, index) => (
                  <View style={[contentListStyle.contactContent, {backgroundColor:item.backgroundColor}]} key={index}>
                        {item.icon}
                  </View>
             ))}
            </View>
      </View>
      <View style={[contentListStyle.sectionContainer,{marginTop: 30, marginBottom: 20, backgroundColor:'#f8f398'}]}>
            <Text style={contentListStyle.title}>Top services</Text>
            <View style={{paddingHorizontal:20}}>
                  <Text style={{textAlign:'center', marginBottom: 10, fontSize:15}}>
                        We provide a service that helps you quit smoking effectively and safely. Our team of experts is dedicated to supporting you on your journey to a healthier, smoke-free life.
                  </Text>
                  
            </View> 
      </View>
        <View style={contentListStyle.featureContainer}>
               {featureList.map((item, idx) => (
            <View
              key={idx}
              style={[
                contentListStyle.featureItem,
                { backgroundColor: item.backgroundColor }
              ]}
            >
              <View>{item.icon}</View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{fontSize:15, fontWeight:'600', color:'white'}}>{item.title}</Text>
                <Text style={{textAlign:'center', color: item.textColor}}>{item.content}</Text>
              </View>
            </View>
          ))}
            </View>
    </ScrollView>
  )
}

const contentListStyle = StyleSheet.create({
      title: {
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
      },
      sectionContainer: {
            width: '95%',
            margin:'auto',
            borderRadius: 10,
            paddingVertical:30,
            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
      },
      containerContent: {
            flexDirection: 'row',
            alignContent:'center',
            justifyContent: 'center',
            gap: 20,
      },
      contactContent : {
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
            padding: 10,
            borderRadius:'100%',
            width: 55,
            height: 55,
            justifyContent: 'center',

      },
      button: {
            backgroundColor: '#4CAF50',
            padding: 10,
            width: 150
,            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
            margin: 'auto'
      },
      featureContainer: {
            flexDirection:'row',
            flexWrap: 'wrap',
            paddingHorizontal: 10,
            gap:10,
            justifyContent:'center',
            marginBottom: 20
      },
      featureItem: {
            width: '45%',
            borderRadius: 15,
            alignItems:'center',
            padding: 10,
      }
})