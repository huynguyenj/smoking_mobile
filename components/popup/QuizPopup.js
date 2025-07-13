import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

const questions = [
  "How soon after you wake up do you smoke your first cigarette?",
  "Do you smoke even when you are so ill that you are in bed most of the day?",
  "Which cigarette would you hate most to give up?",
  "How many cigarettes do you smoke per day on average?",
  "Do you smoke more frequently during the first hours after waking than during the rest of the day?",
  "Do you find it difficult to refrain from smoking in places where it is forbidden?",
];

const choices = [
  [
    { label: "Within 5 minutes", value: 3 },
    { label: "6–30 minutes", value: 2 },
    { label: "31–60 minutes", value: 1 },
    { label: "After 60 minutes", value: 0 },
  ],
  [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ],
  [
    { label: "First cigarette in the morning", value: 1 },
    { label: "Any other", value: 0 },
  ],
  [
    { label: "More than 30", value: 3 },
    { label: "21–30", value: 2 },
    { label: "11–20", value: 1 },
    { label: "Less than 10", value: 0 },
  ],
  [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ],
  [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ],
];

export default function QuizPopup({ visible, onClose, onResult }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const handleSelect = (qIdx, val) => {
    const updated = [...answers];
    updated[qIdx] = val;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const unanswered = answers
      .map((val, idx) => (val === -1 ? idx + 1 : null))
      .filter((v) => v !== null);

    if (unanswered.length > 0) {
      setShowErrors(true);
      Alert.alert(
        "Incomplete Quiz",
        `❗ Please answer all questions. Missing: Question(s) ${unanswered.join(
          ", "
        )}`
      );
      return;
    }

    const total = answers.reduce((sum, val) => sum + val, 0);
    setScore(total);
    setSubmitted(true);
    onResult(total);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
            <Text style={styles.title}>Nicotine Dependency Quiz</Text>
            {questions.map((q, qIdx) => (
              <View key={qIdx} style={styles.questionBlock}>
                <Text
                  style={[
                    styles.question,
                    showErrors &&
                      answers[qIdx] === -1 &&
                      styles.errorQuestionText,
                  ]}
                >
                  {q}
                </Text>
                {choices[qIdx].map((c, cIdx) => (
                  <TouchableOpacity
                    key={cIdx}
                    style={[
                      styles.choice,
                      answers[qIdx] === c.value && styles.selectedChoice,
                    ]}
                    onPress={() => handleSelect(qIdx, c.value)}
                    disabled={submitted}
                  >
                    <Text
                      style={
                        answers[qIdx] === c.value
                          ? styles.choiceTextSelected
                          : styles.choiceText
                      }
                    >
                      {c.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            {submitted && score !== null && (
              <Text style={styles.resultText}>✅ Your Score: {score} / 10</Text>
            )}
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancelBtn]}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, styles.submitBtn]}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90%",
    maxHeight: "90%",
    padding: 16,
  },
  scroll: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  questionBlock: {
    marginBottom: 16,
  },
  question: {
    fontWeight: "600",
    marginBottom: 8,
  },
  errorQuestionText: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  choice: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 6,
  },
  selectedChoice: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  choiceText: {
    color: "#000",
  },
  choiceTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultText: {
    textAlign: "center",
    marginVertical: 12,
    fontSize: 16,
    color: "#28a745",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelBtn: {
    backgroundColor: "#ccc",
  },
  submitBtn: {
    backgroundColor: "#28a745",
  },
  cancelText: {
    color: "#333",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
