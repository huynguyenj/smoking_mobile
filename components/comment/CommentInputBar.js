import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function CommentInputBar({
  value,
  onChangeText,
  onSend,
  sending,
}) {
  return (
    <View style={styles.commentBar}>
      <TextInput
        style={styles.input}
        placeholder="Comment here..."
        value={value}
        onChangeText={onChangeText}
        multiline
      />
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={onSend}
        disabled={sending}
      >
        <Text style={styles.sendText}>{sending ? "..." : "Send"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  commentBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    fontSize: 14,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
