import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import privateApiService from "../../services/userPrivateApi";
import CigaretteCard from "../../components/cigarette/CigaratteCard";
import SearchBar from "../../components/common/SearchBar";
import CreateCigarettePopup from "../../components/popup/CreateCigarettePopup";
import CigaretteDetailPopup from "../../components/popup/CigaratteDetailPopup";
import UpdateCigarettePopup from "../../components/popup/UpdateCigarettePopup";
export default function CigaretteScreen() {
  const [cigarettes, setCigarettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  // Lấy danh sách
  const fetchCigarettes = async (pageToLoad = 1) => {
    if (pageToLoad !== 1 && (loadingMore || !hasMore)) return;
    pageToLoad === 1 ? setLoading(true) : setLoadingMore(true);

    try {
      const res = await privateApiService.getAllCigarettes(pageToLoad, limit);
      const newData = res.data.listData || [];
      const totalPages = res.data.pageInfo?.totalPage || 1;

      setCigarettes((prev) =>
        pageToLoad === 1 ? newData : [...prev, ...newData]
      );
      setPage(pageToLoad);
      setHasMore(pageToLoad < totalPages);
    } catch (err) {
      console.error("❌ Failed to fetch cigarettes:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await privateApiService.createCigarette(data);

      if (res?.data) {
        setCigarettes((prev) => [res.data, ...prev]);
        setShowCreatePopup(false);
      } else {
        alert("No data returned from server.");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Unknown error";
      console.error("❌ Failed to create:", message);
      alert(`❌ Failed to create: ${message}`);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const res = await privateApiService.updateCigarette(id, formData);
      if (res?.data) {
        // Cập nhật bằng dữ liệu trả về
        setCigarettes((prev) =>
          prev.map((item) => (item._id === id ? res.data : item))
        );
      } else {
        // Gọi lại chi tiết nếu không có data
        const detailRes = await privateApiService.getCiggrateDetail(id);
        if (detailRes?.data) {
          setCigarettes((prev) =>
            prev.map((item) => (item._id === id ? detailRes.data : item))
          );
        } else {
          alert("Update succeeded but cannot fetch updated data.");
        }
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Unknown error";
      console.error("❌ Update error:", msg);
      alert(`❌ Update error: ${msg}`);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete this record?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await privateApiService.deleteCigarette(id);
              setCigarettes((prev) => prev.filter((item) => item._id !== id));
              alert("🗑️ Deleted successfully.");
            } catch (err) {
              const msg =
                err?.response?.data?.message || err.message || "Unknown error";
              console.error("❌ Delete error:", msg);
              alert(`❌ Delete error: ${msg}`);
            }
          },
        },
      ]
    );
  };

  const openUpdatePopup = (item) => {
    setSelectedItem(item);
    setShowUpdatePopup(true);
  };

  const handleViewDetail = async (item) => {
    setLoadingDetail(true);
    setShowDetailPopup(true); // mở popup trước để thấy loading

    try {
      const res = await privateApiService.getCiggrateDetail(item._id);
      if (res?.data) {
        setSelectedItem(res.data);
      } else {
        alert("No data returned from server.");
        setShowDetailPopup(false);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Unknown error";
      console.error("❌ Error getting detail:", message);
      alert(`❌ Failed to get detail: ${message}`);
      setShowDetailPopup(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    setCigarettes([]);
    setPage(1);
    setHasMore(true);
    fetchCigarettes(1);
  }, []);

  const handleEndReached = () => {
    if (hasMore && !loadingMore) {
      fetchCigarettes(page + 1);
    }
  };

  const filteredCigarettes = cigarettes.filter((item) =>
    (item?.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search cigarettes..."
      />

      <TouchableOpacity
        onPress={() => setShowCreatePopup(true)}
        style={styles.createBtn}
      >
        <Text style={styles.createBtnText}>+ Create Cigarette</Text>
      </TouchableOpacity>

      {loading && cigarettes.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      ) : (
        <FlatList
          data={filteredCigarettes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CigaretteCard
              data={item}
              onViewDetail={() => handleViewDetail(item)}
              onUpdate={() => openUpdatePopup(item)}
              onDelete={() => handleDelete(item._id)}
            />
          )}
          contentContainerStyle={styles.container}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No cigarettes found</Text>
          }
          ListFooterComponent={
            loadingMore && <ActivityIndicator size="small" color="#555" />
          }
        />
      )}
      <CreateCigarettePopup
        visible={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onSubmit={handleCreate}
      />
      {showDetailPopup && selectedItem && (
        <CigaretteDetailPopup
          visible={showDetailPopup}
          onClose={() => setShowDetailPopup(false)}
          data={selectedItem}
          loading={loadingDetail}
        />
      )}
      <UpdateCigarettePopup
        visible={showUpdatePopup}
        onClose={() => setShowUpdatePopup(false)}
        onUpdate={handleUpdate}
        data={selectedItem}
      />
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
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  createBtn: {
    marginHorizontal: 16,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
