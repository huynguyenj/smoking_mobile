import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";

export default function UpdateCigarettePopup({
  visible,
  onClose,
  onUpdate,
  data,
}) {
  const [frequency, setFrequency] = useState("");
  const [money, setMoney] = useState("");
  const [saving, setSaving] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && data) {
      setFrequency(data.smoking_frequency_per_day?.toString() || "");
      setMoney(data.money_consumption_per_day?.toString() || "");
      setSaving(data.saving_money?.toString() || "");
    }
  }, [visible, data]);

  const handleSubmit = async () => {
    if (!frequency || !money || !saving) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      smoking_frequency_per_day: Number(frequency),
      money_consumption_per_day: Number(money),
      saving_money: Number(saving),
    };

    setLoading(true);
    try {
      await onUpdate(data._id, formData);
      onClose();
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("Failed to update record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.popup}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>Update Cigarette Record</Text>

              <Text style={styles.label}>Smoking frequency per day *</Text>
              <TextInput
                placeholder="e.g., 3"
                keyboardType="numeric"
                value={frequency}
                onChangeText={setFrequency}
                style={styles.input}
              />

              <Text style={styles.label}>
                Daily spending on cigarettes (VND) *
              </Text>
              <TextInput
                placeholder="e.g., 20000"
                keyboardType="numeric"
                value={money}
                onChangeText={setMoney}
                style={styles.input}
              />

              <Text style={styles.label}>Estimated money saved (VND) *</Text>
              <TextInput
                placeholder="e.g., 100000"
                keyboardType="numeric"
                value={saving}
                onChangeText={setSaving}
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitText}>Update</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={{ marginTop: 12 }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
    borderRadius: 12,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    textAlign: "center",
    color: "#007bff",
    fontSize: 15,
    fontWeight: "500",
  },
});
