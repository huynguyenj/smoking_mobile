import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons";

export default function BlogCardMenu({ onDelete, onUpdate, showMyBlogs }) {
  const [visible, setVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // ✅

  if (!showMyBlogs) return null;

  const handleClose = () => {
    setVisible(false);
  };

  const handleAction = (type) => {
    setPendingAction(type); // lưu tạm action
    handleClose();
  };

  const handleModalHide = () => {
    if (pendingAction === "update") onUpdate?.();
    else if (pendingAction === "delete") onDelete?.();
    setPendingAction(null);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <FontAwesome name="ellipsis-v" size={18} color="#333" />
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        onBackdropPress={handleClose}
        onSwipeComplete={handleClose}
        onModalHide={handleModalHide} // ✅ callback khi modal đóng xong
        swipeDirection="down"
        style={styles.modal}
        backdropOpacity={0.3}
      >
        <View style={styles.sheet}>
          <View style={styles.dragBar} />

          <Pressable
            style={styles.option}
            onPress={() => handleAction("update")}
          >
            <Text style={styles.updateText}>Cập nhật bài viết</Text>
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => handleAction("delete")}
          >
            <Text style={styles.deleteText}>Xoá bài viết</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "#fff",
    paddingBottom: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  option: {
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  deleteText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  updateText: {
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
  },
});
