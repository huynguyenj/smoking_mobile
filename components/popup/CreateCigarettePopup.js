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
import QuizPopup from "./QuizPopup";

export default function CreateCigarettePopup({ visible, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [money, setMoney] = useState("");
  const [nicotine, setNicotine] = useState("");
  const [saving, setSaving] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = async () => {
    const isValid = amount && frequency && money && nicotine !== "" && saving;

    if (!isValid) {
      setShowErrors(true);
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        amount: parseInt(amount),
        smoking_frequency_per_day: parseInt(frequency),
        money_consumption_per_day: parseInt(money),
        nicotine_evaluation: parseInt(nicotine),
        saving_money: parseInt(saving),
      });
      onClose();
      setAmount("");
      setFrequency("");
      setMoney("");
      setNicotine("");
      setSaving("");
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

            <Text style={styles.label}>Number of cigarettes smoked *</Text>
            <TextInput
              placeholder="e.g., 15"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={[styles.input, showErrors && !amount && styles.inputError]}
              placeholderTextColor="#888"
            />

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

            <Text style={styles.label}>Evaluate nicotine level *</Text>
            <TouchableOpacity
              style={[
                styles.input,
                styles.quizButton,
                showErrors && !nicotine && styles.inputError,
              ]}
              onPress={() => setShowQuiz(true)}
            >
              <Text style={nicotine ? styles.quizText : styles.quizPlaceholder}>
                {nicotine
                  ? `Nicotine Level: ${nicotine}/10`
                  : "Tap to evaluate with Quiz"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Estimated money saved (VND) *</Text>
            <TextInput
              placeholder="e.g., 100000"
              keyboardType="numeric"
              value={saving}
              onChangeText={setSaving}
              style={[styles.input, showErrors && !saving && styles.inputError]}
              placeholderTextColor="#888"
            />

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

            {showQuiz && (
              <QuizPopup
                visible={showQuiz}
                onClose={() => setShowQuiz(false)}
                onResult={(value) => setNicotine(value)}
              />
            )}
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
  quizButton: {
    justifyContent: "center",
  },
  quizPlaceholder: {
    color: "#888",
  },
  quizText: {
    color: "#222",
    fontWeight: "600",
  },
});
