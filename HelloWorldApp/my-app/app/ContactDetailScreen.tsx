import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export default function ContactDetailScreen() {
  const params = useLocalSearchParams();
  
  let contact: Contact | null = null;
  try {
    contact = params.contact ? JSON.parse(params.contact as string) : null;
  } catch (error) {
    console.error('Error parsing contact:', error);
  }
  
  if (!contact) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Контакт не найден</Text>
        <Button title="Назад" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>{contact.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Имя:</Text>
          <Text style={styles.detailValue}>{contact.name}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Телефон:</Text>
          <Text style={styles.detailValue}>{contact.phone}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{contact.email}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>ID:</Text>
          <Text style={styles.detailValue}>{contact.id}</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Позвонить"
            onPress={() => alert(`Звонок на номер: ${contact!.phone}`)}
            color="#2ecc71"
          />
        </View>
        
        <View style={styles.buttonWrapper}>
          <Button
            title="Написать"
            onPress={() => alert(`Письмо на: ${contact!.email}`)}
            color="#3498db"
          />
        </View>
      </View>
      
      <View style={styles.navigationButtons}>
        <View style={styles.navButtonWrapper}>
          <Button
            title="Назад"
            onPress={() => router.back()}
            color="#7f8c8d"
          />
        </View>
        
        <View style={styles.navButtonWrapper}>
          <Button
            title="На главную"
            onPress={() => router.push('/')}
            color="#e74c3c"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarLargeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  phone: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  details: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  detailLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButtonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  error: {
    fontSize: 20,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
});