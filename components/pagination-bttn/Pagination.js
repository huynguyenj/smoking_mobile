import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Pagination({page, totalPage, onPrevPage, onNextPage}) {
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity
        disabled={page <= 1 ? true : false}
        onPress={onPrevPage}
      >
        <Text style={page <= 1 ? { color: "grey" } : { color: "blue" }}>
          ◀ Back
        </Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>
        Page {page} / {totalPage}
      </Text>
      <TouchableOpacity
        disabled={page === totalPage ? true : false}
        onPress={onNextPage}
      >
        <Text
          style={page === totalPage ? { color: "grey" } : { color: "blue" }}
        >
          Next ▶
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  position: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    width: 40,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  star: {
    fontSize: 14,
    color: "#777",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 23
  },
});
