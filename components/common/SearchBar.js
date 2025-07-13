import { View, TextInput, StyleSheet, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FontAwesome name="search" size={18} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          placeholderTextColor="#aaa"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    borderWidth: 1,
    borderColor: "#ddd", // light gray border
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
