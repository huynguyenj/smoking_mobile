import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CigaretteDetailPopup({
  visible,
  onClose,
  data,
  loading,
  plans,
}) {
  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const planName =
    plans?.find((plan) => plan._id === data.plan_id)?.content || "—";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.popup} onPress={() => {}}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>🧾 Cigarette Detail</Text>
            <View style={{ width: 22 }} />
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#28a745" />
              <Text style={{ marginTop: 12, color: "#666" }}>
                Loading data...
              </Text>
            </View>
          ) : (
            <>
              {/* Section: Info */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: "#007bff" }]}>
                  🪣 Cigarette Information
                </Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Frequency per day:</Text>
                  <Text style={styles.value}>
                    {data.smoking_frequency_per_day} times
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Cost per day:</Text>
                  <Text style={styles.value}>
                    {data.money_consumption_per_day?.toLocaleString()} đ
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Money saved:</Text>
                  <Text
                    style={[
                      styles.value,
                      { color: "#28a745", fontWeight: "bold" },
                    ]}
                  >
                    {data.saving_money?.toLocaleString()} đ
                  </Text>
                </View>
              </View>

              {/* Section: Plan */}
              <View style={[styles.section, { backgroundColor: "#f6f0ff" }]}>
                <Text style={[styles.sectionTitle, { color: "#a020f0" }]}>
                  📋 Related Plan
                </Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Plan:</Text>
                  <Text style={styles.value}>{planName}</Text>
                </View>
              </View>

              {/* Section: Time */}
              <View style={[styles.section, { backgroundColor: "#ecfff3" }]}>
                <Text style={[styles.sectionTitle, { color: "#28a745" }]}>
                  ⏰ Time
                </Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Created:</Text>
                  <Text style={styles.value}>
                    {formatDate(data.create_date)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Updated:</Text>
                  <Text style={styles.value}>
                    {data.update_date
                      ? formatDate(data.update_date)
                      : "No update yet"}
                  </Text>
                </View>
              </View>

              {/* Section: Status */}
              <View style={[styles.section, { backgroundColor: "#ffeeee" }]}>
                <Text style={[styles.sectionTitle, { color: "#dc3545" }]}>
                  📌 Status
                </Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Record:</Text>
                  <Text style={styles.value}>
                    {data.isDeleted ? (
                      <Text style={{ color: "gray" }}>Deleted</Text>
                    ) : (
                      <Text style={{ color: "#28a745" }}>Active</Text>
                    )}
                  </Text>
                </View>
              </View>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 14,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#28a745",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#e6f0ff",
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#555",
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
});
