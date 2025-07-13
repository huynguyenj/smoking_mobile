import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CommentCard({ comment }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{comment.userInfo?.user_name}</Text>
      <Text style={styles.date}>
        {new Date(comment.created_date).toLocaleString()}
      </Text>
      <Text>{comment.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  name: {
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
});
