import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Книга контактов</Text>
      <Text style={styles.subtitle}>Лабораторная работа №14</Text>
      <Text style={styles.description}>
        Навигация в React Native
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Перейти к списку контактов"
          onPress={() => router.push('/ContactListScreen')}
          color="#4CAF50"
        />
      </View>
      
      <Text style={styles.info}>
        Используйте кнопку выше для перехода на второй экран
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 50,
    color: '#555',
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  info: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});