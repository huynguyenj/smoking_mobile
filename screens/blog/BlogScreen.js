import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import privateApiService from "../../services/userPrivateApi";
import BlogCard from "../../components/blog/BlogCard";
import BlogDetailPopup from "../../components/popup/BlogDetailPopup";
import CreateBlogPopup from "../../components/popup/CreateBlogPopup";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BlogFilterBar from "../../components/blog/BlogFilterBar";
import UpdateBlogPopup from "../../components/popup/UpdateBlogPopup";
import SearchBar from "../../components/common/SearchBar";
export default function BlogScreen() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const [detailBlog, setDetailBlog] = useState(null);
  const [updateBlog, setUpdateBlog] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showMyBlogs, setShowMyBlogs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setBlogs([]);
    setPage(1);
    setHasMore(true);
    fetchBlogs(1);
  }, [showMyBlogs]);

  const fetchBlogs = async (pageToLoad = 1) => {
    if (pageToLoad !== 1 && (loadingMore || !hasMore)) return;
    pageToLoad === 1 ? setLoading(true) : setLoadingMore(true);

    try {
      const res = showMyBlogs
        ? await privateApiService.getMyBlogs(pageToLoad, limit)
        : await privateApiService.getAllBlogs(pageToLoad, limit);

      const newData = res.data.listData || [];
      const totalPages = res.data.pageInfo?.totalPage || 1;

      setBlogs((prev) => (pageToLoad === 1 ? newData : [...prev, ...newData]));
      setPage(pageToLoad);
      setHasMore(pageToLoad < totalPages);
    } catch (err) {
      console.error("❌ Lỗi lấy blog:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await privateApiService.deleteBlog(id);
      const [allRes, myRes] = await Promise.all([
        privateApiService.getAllBlogs(1, limit),
        privateApiService.getMyBlogs(1, limit),
      ]);
      setBlogs(showMyBlogs ? myRes.data.listData : allRes.data.listData);
      setPage(1);
      setHasMore(true);
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "❌ Lỗi xoá blog");
    }
  };

  const handleCreateBlog = async ({ title, content, image }) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (Array.isArray(image)) {
        image.forEach((imgUri, index) => {
          const uri =
            Platform.OS === "android" && !imgUri.startsWith("file://")
              ? `file://${imgUri}`
              : imgUri;
          const filename = uri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename ?? "");
          const type = match ? `image/${match[1]}` : `image`;
          formData.append("image", {
            uri,
            name: filename || `image${index}.jpg`,
            type,
          });
        });
      }

      await privateApiService.createBlog(formData);
      setShowCreatePopup(false);
      fetchBlogs(1);
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "❌ Lỗi tạo blog");
    }
  };

  const handleUpdateBlog = async ({
    id,
    title,
    content,
    image, // all images (cũ + mới)
    keepImages, // ✅ luôn bắt buộc, kể cả []
  }) => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      // ✅ luôn cần truyền keepImages
      formData.append("keep_images", JSON.stringify(keepImages));

      // ✅ Gửi ảnh mới
      const newImages = image.filter(
        (uri) =>
          typeof uri === "string" &&
          (!uri.startsWith("http") || uri.startsWith("file://"))
      );

      newImages.forEach((uri, index) => {
        const cleanUri =
          Platform.OS === "android" && !uri.startsWith("file://")
            ? `file://${uri}`
            : uri;

        const filename = cleanUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename ?? "");
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append("image", {
          uri: cleanUri,
          name: filename || `image${index}.jpg`,
          type,
        });
      });

      await privateApiService.updateBlog(id, formData);
      setUpdateBlog(null);
      fetchBlogs(1);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "❌ Lỗi cập nhật";
      console.error("❌ Cập nhật thất bại:", msg);
      alert(msg);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEndReached = () => {
    if (hasMore && !loadingMore) {
      fetchBlogs(page + 1);
    }
  };

  const handlePress = (blog) => {
    setDetailBlog(blog);
  };

  const handleUpdate = (blog) => {
    setDetailBlog(null); // Đóng popup chi tiết nếu đang mở
    setUpdateBlog(blog);
  };

  if (loading && blogs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search blog..."
      />

      <TouchableOpacity
        onPress={() => setShowCreatePopup(true)}
        style={styles.createBar}
      >
        <Text style={styles.placeholder}>What are you thinking?</Text>
        <FontAwesome name="image" size={20} color="#ccc" />
      </TouchableOpacity>

      <BlogFilterBar
        showMyBlogs={showMyBlogs}
        onChange={(val) => setShowMyBlogs(val)}
      />

      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <BlogCard
            blog={item}
            onPress={() => handlePress(item)}
            onDelete={() => handleDeleteBlog(item._id)}
            onUpdate={() => handleUpdate(item)}
            showMyBlogs={showMyBlogs}
          />
        )}
        contentContainerStyle={styles.container}
        // onRefresh={() => fetchBlogs(1)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          loadingMore && <ActivityIndicator size="small" color="#555" />
        }
      />

      {/* Chi tiết blog */}
      {detailBlog && (
        <BlogDetailPopup
          visible={true}
          blog={detailBlog}
          onClose={() => setDetailBlog(null)}
        />
      )}

      {/* Tạo mới blog */}
      {showCreatePopup && (
        <CreateBlogPopup
          visible={true}
          onClose={() => setShowCreatePopup(false)}
          onSubmit={handleCreateBlog}
        />
      )}

      {/* Cập nhật blog */}
      {updateBlog && (
        <UpdateBlogPopup
          visible={true}
          onClose={() => setUpdateBlog(null)}
          onSubmit={handleUpdateBlog}
          blog={updateBlog}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  placeholder: {
    color: "#ccc",
    fontSize: 16,
  },
});
