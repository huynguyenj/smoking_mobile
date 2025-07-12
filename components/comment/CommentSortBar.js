import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CommentSortBar({ sortOrder, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comment</Text>
      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => onChange("newest")}>
          <Text
            style={[
              styles.sortOption,
              sortOrder === "newest" && styles.selectedSort,
            ]}
          >
            Newest
          </Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity onPress={() => onChange("oldest")}>
          <Text
            style={[
              styles.sortOption,
              sortOrder === "oldest" && styles.selectedSort,
            ]}
          >
            Oldest
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
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortOption: {
    fontSize: 13,
    color: "#666",
  },
  selectedSort: {
    fontWeight: "bold",
    color: "#000",
  },
  divider: {
    marginHorizontal: 4,
    color: "#aaa",
  },
});
