import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import ImageViewing from "react-native-image-viewing";

export default function UpdateBlogPopup({ visible, onClose, onSubmit, blog }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);

  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Khi popup mở và blog có dữ liệu thì set state
  useEffect(() => {
    if (visible && blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
      setImages(blog.image_url || []);
    }
  }, [visible, blog]);

  const handleUpdate = async () => {
    if (loadingPost || !title.trim() || !content.trim()) return;
    setLoadingPost(true);
    try {
      const keepImages = images.filter(
        (uri) => typeof uri === "string" && uri.startsWith("http")
      );

      await onSubmit({
        id: blog._id,
        title,
        content,
        image: images,
        keepImages: images.filter((uri) => uri.startsWith("http")),
      });

      onClose();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Lỗi cập nhật bài viết.";
      console.error("Lỗi cập nhật:", errorMessage);
      alert(errorMessage);
    } finally {
      setLoadingPost(false);
    }
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Bạn cần cấp quyền truy cập thư viện ảnh!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...selectedUris]);
    }
  };

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setIsViewerVisible(true);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.popup}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.iconLeft}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Cập nhật bài viết</Text>
          <TouchableOpacity
            onPress={handleUpdate}
            style={styles.iconRight}
            disabled={loadingPost}
          >
            <Text style={[styles.postBtn, loadingPost && { opacity: 0.5 }]}>
              {loadingPost ? "Đang cập nhật..." : "Cập nhật"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <TextInput
            placeholder="Tiêu đề"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Nội dung..."
            value={content}
            onChangeText={setContent}
            multiline
            style={[styles.input, { height: 100 }]}
            placeholderTextColor="#888"
          />

          <TouchableOpacity
            style={styles.imageButton}
            onPress={handlePickImage}
          >
            <FontAwesome name="image" size={20} color="#34c759" />
            <Text style={styles.imageButtonText}>Thêm ảnh</Text>
          </TouchableOpacity>

          {images.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 12,
              }}
            >
              {images.map((imgUri, index) => (
                <View key={index} style={{ position: "relative" }}>
                  <TouchableOpacity onPress={() => openImageViewer(index)}>
                    <Image
                      source={{ uri: imgUri }}
                      style={styles.imagePreview}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeImageBtn}
                    onPress={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                  >
                    <FontAwesome name="close" color="#fff" size={14} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Image Viewer full screen */}
        <ImageViewing
          images={images.map((uri) => ({ uri }))}
          imageIndex={currentImageIndex}
          visible={isViewerVisible}
          onRequestClose={() => setIsViewerVisible(false)}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  popup: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "90%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    height: 40,
    position: "relative",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  postBtn: {
    color: "#007aff",
    fontWeight: "bold",
    fontSize: 16,
  },
  iconRight: {
    minWidth: 80,
    alignItems: "flex-end",
  },
  iconLeft: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontSize: 22,
    color: "#000",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f2f2f2",
    color: "#000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  imageButtonText: {
    color: "#007aff",
    fontSize: 16,
    marginLeft: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#000a",
    padding: 4,
    borderRadius: 12,
  },
});
