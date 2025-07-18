import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  Button,
  Platform,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import privateApiService from "../../services/userPrivateApi";
import { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserInfoStorage } from "../../store/authStore";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Toast from "react-native-toast-message";
import Pagination from "../../components/pagination-bttn/Pagination";
import LoadingCircle from "../../components/LoadingCircle";
import { useFocusEffect } from "@react-navigation/native";

export default function PlanScreen() {
  const [showHealthDropdown, setShowHealthDropdown] = useState(false);
  const healthOptions = [
    { label: "Good", value: "good" },
    { label: "Average", value: "average" },
    { label: "Bad", value: "bad" },
  ];
  const [showProcessDropdown, setShowProcessDropdown] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState("");
  const [health, setHealth] = useState("good");
  const [process, setProcess] = useState([]);
  const [expectDate, setExpectDate] = useState(new Date(Date.now()));
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [showStart, setShowStart] = useState(false);
  const [showExpect, setShowExpect] = useState(false);
  const [user, setUser] = useState({});
  const [totalPage, setTotalPage] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [planDetai, setPlanDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [planId, setPlanId] = useState();
  const [sort, setSort] = useState(-1); //mới nhất
  const [initialState, setInitialState] = useState();
  const [selectedStage, setSelectedStage] = useState();
  const [openedIndex, setOpenedIndex] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  const [cigaretteSate, setCigaretteState] = useState();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPageNum(1);
    fetchPlan(1, rowsPerPage).finally(() => setRefreshing(false));
  }, [pageNum, rowsPerPage]);

  const fetchPlan = async (page, limit, sortOrder) => {
    setIsLoad(true);
    try {
      const response = await privateApiService.getAllPlans(
        page,
        limit,
        sortOrder
      );
      setPlanList(response.data?.listData);
      setTotalPage(response.data?.pageInfo?.totalPage);
      console.log(response.data?.listData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  const fetchInitialState = async () => {
    try {
      const response = await privateApiService.getInitialState();
      setInitialState(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlanDetail = async (id) => {
    try {
      setIsLoad(true);
      const response = await privateApiService.getPlanDetail(id);
      const plan = response.data;
      setOpenModal(true);
      setPlanDetail(plan);
      setContent(plan.content);
      setHealth(plan.health_status);
      setProcess(plan.process_stage);
      setStartDate(new Date(plan.start_date));
      setExpectDate(new Date(plan.expected_result_date));
      setIsEdit(true);
      setOpenModal(true);
      console.log(plan.process_stage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  const payload = {
    ...(isEdit ? {} : { user_id: user._id }),

    // process_stage: process,
    health_status: health,
    content: content,
    start_date: startDate.getTime(),
    // expected_result_date: expectDate.getTime(),
    ...(isEdit ? {} : { initial_cigarette_id: cigaretteSate }),
  };

  const checkCompleteStage = async (stage) => {
    setOpenModal(false);
    try {
      await privateApiService.checkCompleteStage(planId, stage);

      Toast.show({
        type: "success",
        text1: "Check success",
        text1Style: { fontSize: 20 },
        visibilityTime: 2000,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error,
        text1Style: { fontSize: 20 },
        visibilityTime: 2000,
        position: "top",
      });
    }
  };

  const handleResetField = () => {
    setContent("");
    setHealth("good");
    setProcess("start");
    setStartDate(new Date());
    setExpectDate(new Date());
  };

  const updatePlan = async () => {
    try {
      setIsLoad(true);
      await privateApiService.updatePlanById(planId, payload);
      setPageNum(1);
      fetchPlan(1, rowsPerPage, 1);
      handleResetField();
      setOpenModal(false);
      Toast.show({
        type: "success",
        text1: "Update Successful",
        text1Style: { fontSize: 20 },
        visibilityTime: 2000,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Update fail",
        text1Style: { fontSize: 20 },
        visibilityTime: 2000,
        position: "top",
      });
    } finally {
      setIsLoad(false);
    }
  };

  const deletePlan = (id) => {
    Alert.alert("Confirm delete", "Do you want to delete this plan?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoad(true);
            await privateApiService.deletePlanById(id);
            setPageNum(1);
            fetchPlan(1, rowsPerPage, 1);
            Toast.show({
              type: "success",
              text1: "Delete Successful",
              text1Style: { fontSize: 20 },
              visibilityTime: 2000,
              position: "top",
            });
          } catch (error) {
            console.log(error);
            Toast.show({
              type: "error",
              text1: "Delete fail",
              text1Style: { fontSize: 20 },
              visibilityTime: 2000,
              position: "top",
            });
          } finally {
            setIsLoad(false);
          }
        },
      },
    ]);
  };

  const createPlan = async () => {
    try {
      setIsLoad(true);
      await privateApiService.createPlan(payload);
      handleResetField();
      setPageNum(1);
      fetchPlan(1, rowsPerPage, 1);
      setOpenModal(false);
      Toast.show({
        type: "success",
        text1: "Create Successful",
        text1Style: { fontSize: 20 },
        visibilityTime: 2000,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      console.log(payload);

      Toast.show({
        type: "error",
        text1: "Create fail",
        text1Style: { fontSize: 20 },
        visibilityTime: 2000,
        position: "top",
      });
    } finally {
      setIsLoad(false);
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    setShowStart(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };
  const toggleSort = () => {
    const newSort = sort === -1 ? 1 : -1;
    setSort(newSort);
    setPageNum(1); // reset về page 1
    fetchPlan(1, rowsPerPage, newSort);
  };

  const onChangeExpectDate = (event, selectedDate) => {
    setShowExpect(false);
    if (selectedDate) {
      setExpectDate(selectedDate);
    }
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
      fetchPlan(pageNum - 1, rowsPerPage, sort);
    }
  };

  const handleNextPage = () => {
    if (pageNum < totalPage) {
      setPageNum(pageNum + 1);
      fetchPlan(pageNum + 1, rowsPerPage, sort);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        const response = useUserInfoStorage.getState().userInfo;
        setUser(response);
        fetchPlan(pageNum, rowsPerPage, sort);
        fetchInitialState();
      };

      init();
    }, [pageNum, rowsPerPage, sort])
  );

  // Card plan
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            top: -20,
            right: -20,
          }}
        >
          <Pressable onPress={() => deletePlan(item._id)} style={styles.delete}>
            <Text style={{ color: "white" }}>Delete</Text>
            <Ionicons name="trash-bin-outline" size={24} color="white" />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => {
            getPlanDetail(item._id);
            setPlanId(item._id);
            setIsEdit(true);
          }}
        >
          {/* <View style={styles.row}>
            <Ionicons name="analytics-outline" size={20} color="black" />
            <Text style={styles.label}>Process Stage: </Text>
            <Text style={styles.value}>{item.process_stage}</Text>
          </View> */}

          <View style={styles.row}>
            <Ionicons
              name={
                item.health_status === "bad"
                  ? "heart-dislike-circle-outline"
                  : "heart-circle-outline"
              }
              size={20}
              color={item.health_status === "bad" ? "red" : "green"}
            />
            <Text style={styles.label}>Health Status: </Text>
            <Text
              style={[
                styles.value,
                { color: item.health_status === "bad" ? "red" : "green" },
              ]}
            >
              {item.health_status}
            </Text>
          </View>

          {/* <View style={styles.section}>
        <Text style={styles.label}>Plan Content:</Text>
        <Text style={styles.content}>{plan.content}</Text>
      </View> */}

          <View style={styles.row}>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>
              {moment(item.start_date).format("DD/MM/YYYY")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Expected Result Date:</Text>
            <Text style={styles.value}>
              {moment(item.expected_result_date).format("DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  if (isLoad) return <LoadingCircle />;
  return (
    <View>
      {/* Create bttn */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 10,
          gap: 10,
        }}
      >
        <Pressable style={styles.sortButton} onPress={toggleSort}>
          <Text style={{ color: "white" }}>
            Sort: {sort === -1 ? "Newest" : "Oldest"}
          </Text>
        </Pressable>
        <Pressable style={styles.open} onPress={() => setOpenModal(true)}>
          <Text style={{ color: "white" }}>Create plan</Text>
        </Pressable>
      </View>

      {/* Create / Update modal */}
      <Modal animationType="slide" visible={openModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                {isEdit ? "Update your plan" : "Create your plan"}
              </Text>

              {/* Content */}
              <Text style={styles.label}>Content</Text>
              <TextInput
                style={styles.input}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
              />

              {/* Health status */}
              <Text style={styles.label}>Your health status</Text>
              <Pressable
                style={styles.dropdownButton}
                onPress={() => setShowHealthDropdown(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {healthOptions.find((item) => item.value === health)?.label ||
                    "Select"}
                </Text>
              </Pressable>

              {/* Health status Dropdown modal */}
              <Modal
                visible={showHealthDropdown}
                transparent
                animationType="fade"
              >
                <Pressable
                  style={styles.modalOverlay}
                  onPress={() => setShowHealthDropdown(false)}
                >
                  <View style={styles.dropdown}>
                    {healthOptions.map((item) => (
                      <Pressable
                        key={item.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setHealth(item.value);
                          setShowHealthDropdown(false);
                        }}
                      >
                        <Text>{item.label}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Pressable>
              </Modal>

              {/* Cigarette state */}
              {!isEdit ? (
                <>
                  <Text style={styles.label}>Cigarette state</Text>
                  <Pressable
                    style={styles.dropdownButton}
                    onPress={() => setShowInitial(true)}
                  >
                    <Text style={styles.dropdownButtonText}>
                      Nicotine:
                      {initialState
                        ?.find((item) => item._id === cigaretteSate)
                        ?.nicotine_evaluation?.toString() || "Select"}
                    </Text>
                  </Pressable>
                  {initialState?.length === 0 ? (
                    <Text>Create initial state first</Text>
                  ) : null}

                  {/* Initial Dropdown modal */}
                  <Modal visible={showInitial} transparent animationType="fade">
                    <Pressable
                      style={styles.modalOverlay}
                      onPress={() => setShowInitial(false)}
                    >
                      <View style={styles.dropdown}>
                        {initialState?.map((item) => (
                          <Pressable
                            key={item._id}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setCigaretteState(item._id);
                              setShowInitial(false);
                            }}
                          >
                            <Text>Nicotine: {item.nicotine_evaluation}</Text>
                          </Pressable>
                        ))}
                      </View>
                    </Pressable>
                  </Modal>
                </>
              ) : null}

              {/* Process stage */}
              {isEdit ? (
                <>
                  <Text style={styles.label}>Process stage</Text>
                  <View style={{ padding: 5 }}>
                    <FlatList
                      data={process}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <View
                          style={{ marginHorizontal: 8, alignItems: "center" }}
                        >
                          <TouchableOpacity
                            style={styles.stageItem}
                            onPress={() =>
                              setOpenedIndex((prev) =>
                                prev === index ? null : index
                              )
                            }
                          >
                            <Text style={styles.stageText}>
                              Stage {index + 1}
                            </Text>
                          </TouchableOpacity>

                          {openedIndex === index && (
                            <View style={styles.detailBox}>
                              <Text>
                                Start:{" "}
                                {moment(item.start_time).format("DD/MM/YYYY")}
                              </Text>
                              <Text>
                                End:{" "}
                                {moment(item.end_time).format("DD/MM/YYYY")}
                              </Text>
                              <Text>
                                Expected Result: {item.expected_result}
                              </Text>
                              <View style={{ flexDirection: "row" }}>
                                <Text>Completed:</Text>
                                {item.isCompleted ? (
                                  <Ionicons
                                    name="checkmark"
                                    size={20}
                                    color="green"
                                  />
                                ) : (
                                  <Ionicons
                                    name="close-outline"
                                    size={20}
                                    color="red"
                                  />
                                )}
                              </View>
                              <View>
                                {/* <TouchableOpacity
                                  onPress={() => setOpenedIndex(null)}
                                >
                                  <Text
                                    style={{ color: "#4C9EEB", marginTop: 5 }}
                                  >
                                    Close
                                  </Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#c7807b",
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                    marginHorizontal: -10,
                                    marginBottom: -5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 5,
                                  }}
                                  onPress={() => checkCompleteStage(item)}
                                >
                                  <Text style={{ color: "white" }}>
                                    Check compete
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </View>
                      )}
                    />
                  </View>
                </>
              ) : null}

              {/* <Pressable
                style={styles.dropdownButton}
                onPress={() => setShowProcessDropdown(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {processOptions.find((item) => item.value === process)
                    ?.label || "Select"}
                </Text>
              </Pressable> */}

              {/* Dropdown modal */}
              {/* <Modal
                visible={showProcessDropdown}
                transparent
                animationType="fade"
              >
                <Pressable
                  style={styles.modalOverlay}
                  onPress={() => setShowProcessDropdown(false)}
                >
                  <View style={styles.dropdown}>
                    {processOptions.map((item) => (
                      <Pressable
                        key={item.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setProcess(item.value);
                          setShowProcessDropdown(false);
                        }}
                      >
                        <Text>{item.label}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Pressable>
              </Modal> */}

              {/* Start date */}
              <Text style={styles.label}>Start date</Text>
              <Pressable
                style={styles.datePicker}
                onPress={() => setShowStart(true)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>{moment(startDate).format("DD/MM/YYYY")}</Text>
                  <Ionicons name="calendar-outline" size={24} color="black" />
                </View>
              </Pressable>
              {showStart && (
                <DateTimePicker
                  mode="date"
                  minimumDate={new Date()}
                  value={startDate}
                  onChange={onChangeStartDate}
                />
              )}

              {isEdit ? (
                <>
                  <Text style={styles.label}>End date</Text>
                  <Pressable
                    style={styles.datePicker}
                    onPress={() => setShowExpect(true)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>{moment(expectDate).format("DD/MM/YYYY")}</Text>
                      <Ionicons name="calendar-sharp" size={24} color="black" />
                    </View>
                  </Pressable>
                </>
              ) : null}

              {/* {showExpect && (
                <DateTimePicker
                  mode="date"
                  minimumDate={startDate}
                  value={expectDate}
                  onChange={onChangeExpectDate}
                />
              )} */}

              {/* Create / Save / Cancel */}
              <View style={styles.bttn}>
                <Pressable
                  style={styles.cancel}
                  onPress={() => {
                    setOpenModal(false);
                    setIsEdit(false);
                    handleResetField();
                  }}
                >
                  <Text style={{ color: "white" }}>Cancel</Text>
                </Pressable>
                {isEdit ? (
                  <Pressable style={styles.save} onPress={updatePlan}>
                    <Text style={{ color: "white" }}>Save</Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.create} onPress={createPlan}>
                    <Text style={{ color: "white" }}>Create</Text>
                  </Pressable>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      {isLoad ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={planList}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            planList && planList.length > 0 ? (
              <Pagination
                page={pageNum}
                totalPage={totalPage}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
            ) : null
          }
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ color: "#666", fontSize: 16 }}>
                No plans found
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#444",
    marginLeft: 6,
  },
  value: {
    color: "#333",
    marginLeft: 4,
  },
  section: {
    marginVertical: 12,
  },
  content: {
    marginTop: 4,
    fontStyle: "italic",
    color: "#555",
  },
  open: {
    padding: 5,
    backgroundColor: "blue",
    borderRadius: 5,
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bttn: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 90,
  },
  cancel: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 15,
  },
  create: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 15,
  },
  save: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 30,
    height: 50,
    justifyContent: "center",
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    marginHorizontal: 10,
    paddingVertical: 5,
    width: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailLabel: {
    fontWeight: "bold",
    color: "#555",
    width: "50%",
  },

  detailValue: {
    color: "#222",
    width: "50%",
    textAlign: "right",
  },
  delete: {
    backgroundColor: "red",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    padding: 5,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    maxHeight: "80%",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dropdownButtonText: {
    color: "#333",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sortButton: {
    padding: 5,
    backgroundColor: "purple",
    borderRadius: 5,
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stageItem: {
    padding: 10,
    marginHorizontal: 8,
    backgroundColor: "#4C9EEB",
    borderRadius: 8,
    marginBottom: 20,
  },
  stageText: {
    color: "white",
    fontWeight: "bold",
  },
  detailBox: {
    marginTop: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    width: 160,
  },
});
