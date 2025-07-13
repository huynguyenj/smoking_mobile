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
}) {
  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

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
              <Text style={{ marginTop: 12, color: "#666" }}>Loading...</Text>
            </View>
          ) : (
            <>
              {/* Section: Info */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: "#007bff" }]}>
                  🪣 Cigarette Information
                </Text>
                <Text style={styles.itemText}>
                  🔥 <Text style={styles.bold}>Amount:</Text> {data.amount}{" "}
                  cigarettes
                </Text>
                <Text style={styles.itemText}>
                  ⏱️ <Text style={styles.bold}>Per Day:</Text>{" "}
                  {data.smoking_frequency_per_day} times
                </Text>
                <Text style={styles.itemText}>
                  💰 <Text style={styles.bold}>Cost/Day:</Text>{" "}
                  {data.money_consumption_per_day.toLocaleString()} VND
                </Text>
                <Text style={styles.itemText}>
                  🪙 <Text style={styles.bold}>Money Saved:</Text>{" "}
                  {data.saving_money.toLocaleString()} VND
                </Text>
              </View>

              {/* Section: Nicotine */}
              <View style={[styles.section, { backgroundColor: "#f6f0ff" }]}>
                <Text style={[styles.sectionTitle, { color: "#a020f0" }]}>
                  🧪 Nicotine Evaluation
                </Text>
                <Text style={styles.itemText}>
                  📊 <Text style={styles.bold}>Score:</Text>{" "}
                  {data.nicotine_evaluation}/10
                </Text>
              </View>

              {/* Section: Time */}
              <View style={[styles.section, { backgroundColor: "#ecfff3" }]}>
                <Text style={[styles.sectionTitle, { color: "#28a745" }]}>
                  ⏰ Time
                </Text>
                <Text style={styles.itemText}>
                  🗓️ <Text style={styles.bold}>Created:</Text>{" "}
                  {formatDate(data.create_date)}
                </Text>
                <Text style={styles.itemText}>
                  📆 <Text style={styles.bold}>No Smoke Date:</Text> No date
                </Text>
              </View>

              {/* Section: Status */}
              <View style={[styles.section, { backgroundColor: "#ffeeee" }]}>
                <Text style={[styles.sectionTitle, { color: "#dc3545" }]}>
                  📌 Status
                </Text>
                <Text style={styles.itemText}>
                  ✅{" "}
                  <Text style={[styles.bold, { color: "#28a745" }]}>
                    Active
                  </Text>
                </Text>
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
  itemText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  bold: {
    fontWeight: "600",
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
});
