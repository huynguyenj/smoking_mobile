import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CigaretteCard({
  data,
  onViewDetail,
  onUpdate,
  onDelete,
  plans,
}) {
  const {
    smoking_frequency_per_day,
    money_consumption_per_day,
    saving_money,
    create_date,
    plan_id,
  } = data;

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const planName = plans?.find((plan) => plan._id === plan_id)?.content || "—";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Cigarette Record</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Frequency per day:</Text>
        <Text style={styles.value}>{smoking_frequency_per_day} times</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Cost per day:</Text>
        <Text style={styles.value}>
          {money_consumption_per_day.toLocaleString()} đ
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Money saved:</Text>
        <Text style={[styles.value, { color: "#28a745", fontWeight: "bold" }]}>
          {saving_money.toLocaleString()} đ
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Created on:</Text>
        <Text style={styles.value}>{formatDate(create_date)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Plan:</Text>
        <Text style={styles.value}>{planName}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.detailBtn]}
          onPress={onViewDetail}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.updateBtn]}
          onPress={onUpdate}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteBtn]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    color: "#555",
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    flexWrap: "wrap",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
    marginBottom: 6,
  },
  detailBtn: {
    backgroundColor: "#007bff",
  },
  updateBtn: {
    backgroundColor: "#ffc107",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
