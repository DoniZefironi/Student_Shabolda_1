import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Switch,
  StatusBar
} from 'react-native';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert(
        'Ошибка валидации',
        'Пожалуйста, заполните все поля формы',
        [{ text: 'OK', style: 'cancel' }]
      );
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(
        'Неверный email',
        'Пожалуйста, введите корректный адрес электронной почты',
        [{ text: 'OK', style: 'cancel' }]
      );
      return;
    }

    Alert.alert(
      'Спасибо за отзыв!',
      `Ваше сообщение от ${name} успешно отправлено.\nУведомления: ${notificationsEnabled ? 'включены' : 'отключены'}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setMessage('');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/100/4A90E2/FFFFFF?text=ASOI',
            }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Шаболда Владислав</Text>
          <Text style={styles.profileRole}>Пользователь</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Обратная связь</Text>
          <Text style={styles.sectionSubtitle}>
            Расскажите нам, как мы можем улучшить систему.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ваше имя *</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите ваше имя"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email для связи *</Text>
            <TextInput
              style={styles.input}
              placeholder="example@university.ru"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ваше сообщение *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Опишите вашу проблему или предложение..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              Получать ответ по email
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ccc', true: '#4A90E2' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Отправить отзыв"
              color="#4A90E2"
              onPress={handleSubmit}
              disabled={!name.trim() || !email.trim() || !message.trim()}
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Система АСОИ</Text>
          <Text style={styles.infoText}>
            После отправки вы получите уведомление на указанный email в течение 24 часов.
          </Text>
          <Text style={styles.infoText}>
            Все отзывы используются для улучшения сервиса.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
  },
  infoSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1976d2',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#1565c0',
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default FeedbackScreen;