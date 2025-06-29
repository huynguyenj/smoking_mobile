import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingCircle({backgroundColor}) {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
});
