import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CreateCigarettePopup({
  visible,
  onClose,
  onSubmit,
  plans,
}) {
  const [frequency, setFrequency] = useState("");
  const [money, setMoney] = useState("");
  const [saving, setSaving] = useState("");
  const [planId, setPlanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = async () => {
    const isValid =
      frequency !== "" && money !== "" && saving !== "" && planId !== "";

    if (!isValid) {
      setShowErrors(true);
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        smoking_frequency_per_day: parseInt(frequency),
        money_consumption_per_day: parseInt(money),
        saving_money: parseInt(saving),
        plan_id: planId,
      });

      onClose();
      setFrequency("");
      setMoney("");
      setSaving("");
      setPlanId("");
      setShowErrors(false);
    } catch (err) {
      alert("Failed to create record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable style={styles.overlay} onPress={onClose}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.popup}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={styles.header}>Create Cigarette Record</Text>

            <Text style={styles.label}>Smoking frequency per day *</Text>
            <TextInput
              placeholder="e.g., 3"
              keyboardType="numeric"
              value={frequency}
              onChangeText={setFrequency}
              style={[
                styles.input,
                showErrors && !frequency && styles.inputError,
              ]}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>Daily cigarette spending (VND) *</Text>
            <TextInput
              placeholder="e.g., 20000"
              keyboardType="numeric"
              value={money}
              onChangeText={setMoney}
              style={[styles.input, showErrors && !money && styles.inputError]}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>Estimated money saved (VND) *</Text>
            <TextInput
              placeholder="e.g., 100000"
              keyboardType="numeric"
              value={saving}
              onChangeText={setSaving}
              style={[styles.input, showErrors && !saving && styles.inputError]}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>Select Related Plan *</Text>
            <View
              style={[
                styles.pickerContainer,
                showErrors && !planId && styles.inputError,
              ]}
            >
              <Picker
                selectedValue={planId}
                onValueChange={(itemValue) => setPlanId(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="-- Select a plan --" value="" />
                {plans?.map((plan) => (
                  <Picker.Item
                    key={plan._id}
                    label={plan.content}
                    value={plan._id}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.cancelBtn]}
                onPress={onClose}
                disabled={loading}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.submitBtn]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitText}>Create</Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    padding: 24,
    maxHeight: "90%",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  inputError: {
    borderColor: "#dc3545",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#f2f2f2",
    marginRight: 10,
  },
  submitBtn: {
    backgroundColor: "#28a745",
  },
  cancelText: {
    color: "#333",
    fontSize: 15,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
