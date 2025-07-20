import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useOpen from '../../hooks/open/useOpen';
import QuizPopup from '../../components/popup/QuizPopup';
import privateApiService from '../../services/userPrivateApi';
import Toast from 'react-native-toast-message';
import LoadingCircle from '../../components/LoadingCircle';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function InitialStateDetail({ route }) {
  const { isOpen, toggle } = useOpen();
  const [result, setResult] = useState(undefined);
  const [amount, setAmount] = useState('');
  const [smokeFrequency, setSmokeFrequency] = useState('');
  const [money, setMoney] = useState('');
  const [error, setError] = useState({});
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()
  const fetchDetail = async () => {
    try {
      const response = await privateApiService.getDetailInitialState(id);
      setAmount(response.data.amount_cigarettes.toString());
      setSmokeFrequency(response.data.smoking_frequency_per_day.toString());
      setMoney(response.data.money_each_cigarette.toString());
      setResult(response.data.nicotine_evaluation.toString());
    } catch (error) {
      console.error('Fetch error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch details',
        text2: error?.response?.data?.message || error?.message || 'Unexpected error',
        visibilityTime: 2000,
        position: 'top',
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDetail();
    }, [])
  );

  const validate = () => {
    const err = {};
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      err.amount = 'Please enter a valid amount';
    }
    if (!smokeFrequency || isNaN(smokeFrequency) || Number(smokeFrequency) <= 0) {
      err.smokeFrequency = 'Please enter a valid smoking frequency';
    }
    if (!money || isNaN(money) || Number(money) <= 0) {
      err.money = 'Please enter a valid amount of money';
    }
    if (
      result === undefined ||
      isNaN(Number(result)) ||
      Number(result) < 0 ||
      Number(result) > 10
    ) {
      err.result = 'Please complete the addiction quiz';
    }

    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);
      const data = {
        amount_cigarettes: Number(amount),
        smoking_frequency_per_day: Number(smokeFrequency),
        money_each_cigarette: Number(money),
        nicotine_evaluation: Number(result),
      };
      await privateApiService.updateInitialState(id, data);
      Toast.show({
        type: 'success',
        text1: 'Update successful',
        visibilityTime: 2000,
        position: 'top',
      });
      fetchDetail();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: error?.response?.data?.message || error?.message || 'Unexpected error',
        visibilityTime: 2000,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingCircle />;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Initial State Details</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Amount of Cigarettes</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="e.g., 5"
          />
          {error?.amount && <Text style={styles.errorText}>{error.amount}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Smoking Frequency (per day)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={smokeFrequency}
            onChangeText={setSmokeFrequency}
            placeholder="e.g., 3"
          />
          {error?.smokeFrequency && (
            <Text style={styles.errorText}>{error.smokeFrequency}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Money per Cigarette</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={money}
            onChangeText={setMoney}
            placeholder="e.g., 1.5"
          />
          {error?.money && <Text style={styles.errorText}>{error.money}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Nicotine Evaluation</Text>
          {result === undefined ? (
            <TouchableOpacity style={styles.quizButton} onPress={toggle}>
              <Text style={styles.quizButtonText}>Take Quiz</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.resultBadge}>
              <Text style={styles.resultText}>{result} / 10</Text>
            </View>
          )}
          {error?.result && <Text style={styles.errorText}>{error.result}</Text>}
          <QuizPopup visible={isOpen} onClose={toggle} onResult={setResult} />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Update</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    flexGrow: 1,
  },
  titleContainer: {
    backgroundColor: '#3baea0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    flexDirection:'row',
    gap: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 13,
    fontWeight: '500',
  },
  quizButton: {
    backgroundColor: '#a393eb',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  resultBadge: {
    backgroundColor: '#fd5959',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  resultText: {
    color: 'white',
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#5fc9f3',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
