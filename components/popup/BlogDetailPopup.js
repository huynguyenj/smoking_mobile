import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import privateApiService from "../../services/userPrivateApi";
import CommentCard from "../../components/comment/CommentCard";
import CommentInputBar from "../../components/comment/CommentInputBar";
import CommentSortBar from "../../components/comment/CommentSortBar";
import ImageViewing from "react-native-image-viewing";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
export default function BlogDetailPopup({ visible, onClose, blog }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [shouldRefresh, setShouldRefresh] = useState(true);

  const limit = 5;

  const { width } = useWindowDimensions();
  useEffect(() => {
    if (visible && blog?._id && shouldRefresh) {
      resetComments();
    }
  }, [visible, blog?._id, sortOrder, shouldRefresh]);

  const resetComments = () => {
    setPage(1);
    setHasMore(true);
    fetchComments(1);
  };

  const fetchComments = async (nextPage = 1) => {
    if (loadingMore || !hasMore) return;

    if (nextPage === 1) setLoading(true);
    setLoadingMore(true);

    try {
      const res = await privateApiService.getCommentsByBlogId(
        blog._id,
        nextPage,
        limit,
        sortOrder
      );

      const newComments = res.data.listData || [];
      if (nextPage === 1) {
        setComments(newComments);
      } else {
        setComments((prev) => [...prev, ...newComments]);
      }

      setPage(nextPage);
      setHasMore(newComments.length === limit);
    } catch (err) {
      console.error("❌ Lỗi lấy comment:", err.response?.data || err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    setSending(true);
    try {
      const res = await privateApiService.createComment(blog._id, {
        content: newComment,
      });
      fetchComments()

      if (!res.data?.userInfo) {
        await resetComments();
      } else {
        const newCmt = res.data;
        setComments((prev) =>
          sortOrder === "newest" ? [newCmt, ...prev] : [...prev, newCmt]
        );
      }

      setNewComment("");
    } catch (err) {
      console.error("❌ Lỗi gửi bình luận:", err.response?.data || err.message);
    } finally {
      setSending(false);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    if (isCloseToBottom && hasMore && !loadingMore) {
      fetchComments(page + 1);
    }
  };

  const handleSortChange = (order) => {
    if (order !== sortOrder) {
      setSortOrder(order);
    }
  };

  if (!blog) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContent}
        >
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
            onScroll={handleScroll}
            scrollEventThrottle={400}
          >
            {Array.isArray(blog.image_url) && blog.image_url.length > 0 && (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageScroll}
                >
                  {blog.image_url.map((url, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedImageIndex(index);
                        setIsViewerVisible(true);
                      }}
                    >
                      <Image source={{ uri: url }} style={styles.image} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <ImageViewing
                  images={blog.image_url.map((uri) => ({ uri }))}
                  imageIndex={selectedImageIndex}
                  visible={isViewerVisible}
                  onRequestClose={() => setIsViewerVisible(false)}
                />
              </>
            )}

            <Text style={styles.title}>{blog.title}</Text>
            <Text style={styles.date}>
              {new Date(blog.create_date).toLocaleDateString()}
            </Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: blog.content }}
              baseStyle={styles.content}
            />

            <CommentSortBar sortOrder={sortOrder} onChange={handleSortChange} />

            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                {comments.map((cmt, index) => (
                  <CommentCard key={index} comment={cmt} />
                ))}
                {loadingMore && (
                  <ActivityIndicator
                    size="small"
                    color="#555"
                    style={{ marginTop: 10 }}
                  />
                )}
              </>
            )}
          </ScrollView>

          <CommentInputBar
            value={newComment}
            onChangeText={setNewComment}
            onSend={handleSendComment}
            sending={sending}
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: "90%",
    paddingBottom: 0,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  imageScroll: {
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  date: { fontSize: 12, color: "#888", marginBottom: 8 },
  content: { fontSize: 16, color: "#333", marginBottom: 16 },
  commentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 10,
  },
  backText: {
    fontSize: 22,
    color: "#000",
  },
});
