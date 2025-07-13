import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Button,
  TouchableOpacity,
} from "react-native";
import privateApiService from "../../services/userPrivateApi";
import Pagination from "../../components/pagination-bttn/Pagination";
import { useFocusEffect } from "@react-navigation/native";
import LoadingCircle from '../../components/LoadingCircle'

export default function RankScreen() {
  const [rankList, setRankList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState(1);

  const fetchRanks = async (
    pageNum,
    limit = rowsPerPage,
    sortValue = sort,
    isRefresh = false
  ) => {
    try {
      setLoading(true)

      const res = await privateApiService.getRankingList(
        pageNum,
        limit,
        sortValue
      );
      const data = res.data;

      setTotalPage(data.pageInfo.totalPage);

      if (isRefresh || pageNum === 1) {
        setRankList(data.listData);
      } else {
        setRankList(data.listData);
      }

      setPage(pageNum);
    } catch (err) {
      console.error(
        "Failed to fetch ranks:",
        err?.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    console.log("🟡 onEndReached triggered", page, totalPage);
    if (!loading && page < totalPage) {
      fetchRanks(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchRanks(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      fetchRanks(page + 1, rowsPerPage);
    }
  };

  const handleRefresh = () => {
    console.log("ok");

    setRefreshing(true);
    fetchRanks(1, rowsPerPage, sort, true);
  };

  const renderItem = ({ item, index }) => {
    const isTop = item.position <= 3;
    const backgroundColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

    return (
      <View
        key={item._id}
        style={[
          styles.itemContainer,
          isTop && { backgroundColor: backgroundColors[index] },
        ]}
      >
        <Text style={[styles.position, isTop && { color: "#000" }]}>
          {item.position}
        </Text>
        <View style={styles.info}>
          <Text style={[styles.name, isTop && { color: "#000" }]}>
            {item.users.user_name || "Unknown User"}
          </Text>
          <Text style={[styles.star, isTop && { color: "#000" }]}>
            ⭐ {item.star_count}
          </Text>
        </View>
      </View>
    );
  };

  useFocusEffect(useCallback(() => {
    fetchRanks(1, rowsPerPage, sort, true);
  }, []))

  if (loading) return <LoadingCircle/>
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <View>
          <FlatList
            data={rankList}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            contentContainerStyle={{ height: 400 }}
            ListFooterComponent={
              loading && page > 1 ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : null
            }
          />
          <View style={styles.pagination}>
            <Pagination
              page={page}
              totalPage={totalPage}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
    padding: 20,
    position: "relative",
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
  },
  pagination: {
    marginTop: 10,
  },
});
