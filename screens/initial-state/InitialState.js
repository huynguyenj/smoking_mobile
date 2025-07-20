import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import privateApiService from '../../services/userPrivateApi'
import Toast from 'react-native-toast-message'
import LoadingCircle from '../../components/LoadingCircle'
import InitialCard from './InitialCard'
import { initialStateStyle } from '../../styles/initialStateStyle'
import CreateInitial from './CreateInitial'
import useOpen from '../../hooks/open/useOpen'


export default function InitialState() {
  const [initialStates, setInitialState] = useState([])
  const [isLoading, setIsLoading] = useState(false)
    const { isOpen, handleClose, handleOpen} = useOpen()

  const fetchInitialStates = async () => {
    try {
      setIsLoading(true)
      const response = await privateApiService.getInitialState()
      setInitialState(response.data)
    } catch (error) {
        Toast.show({
                type: 'error',
                text1: 'Loading data error',
                text1Style: { fontSize: 20 },
                text2: error,
                text2Style: { fontSize: 16 },
                visibilityTime: 2000,
                position:'top'
              })
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(useCallback(() => {
    fetchInitialStates()
  },[]))
  const handleLoadMore = async () => {
  }
  if (isLoading) return <LoadingCircle/>
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={initialStateStyle.button} onPress={() => handleOpen()}>
        <Text style={initialStateStyle.textButton}>Create</Text>
      </TouchableOpacity>
      <FlatList
        data={initialStates}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({item}) => (
          <InitialCard data={item} onRefresh={fetchInitialStates}/>
        )}
        contentContainerStyle={initialStateStyle.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1} // this flat list must use padding bottom: 80 to avoid the bottom tab height
        ListFooterComponent={
        <View style={{ backgroundColor: 'lightblue', alignItems: 'center', justifyContent: 'center' }}>
          {isLoading && <ActivityIndicator/>}
        </View>
    }
      />
      {isOpen && 
        <CreateInitial onClose={handleClose} onRefresh={fetchInitialStates} visible={isOpen}/>
      }
    </View>
  )
}