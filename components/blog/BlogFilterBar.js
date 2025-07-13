import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BlogFilterBar({ showMyBlogs, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Blog</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => onChange(true)}>
          <Text
            style={[styles.filterOption, showMyBlogs && styles.selectedFilter]}
          >
            My Blog
          </Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity onPress={() => onChange(false)}>
          <Text
            style={[styles.filterOption, !showMyBlogs && styles.selectedFilter]}
          >
            All Blog
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterOption: {
    fontSize: 13,
    color: "#666",
  },
  selectedFilter: {
    fontWeight: "bold",
    color: "#000",
  },
  divider: {
    marginHorizontal: 4,
    color: "#aaa",
  },
});
