import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

// Тип для контакта
type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

const contacts: Contact[] = [
  { id: '1', name: 'Иван Иванов', phone: '+7 900 123-45-67', email: 'ivan@example.com' },
  { id: '2', name: 'Мария Петрова', phone: '+7 900 234-56-78', email: 'maria@example.com' },
  { id: '3', name: 'Алексей Сидоров', phone: '+7 900 345-67-89', email: 'alex@example.com' },
  { id: '4', name: 'Елена Волкова', phone: '+7 900 456-78-90', email: 'elena@example.com' },
  { id: '5', name: 'Дмитрий Кузнецов', phone: '+7 900 567-89-01', email: 'dmitry@example.com' },
];

// Тип для пропсов элемента FlatList
type ContactItemProps = {
  item: Contact;
};

export default function ContactListScreen() {
  const renderContactItem = ({ item }: ContactItemProps) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => router.push({ 
        pathname: '/ContactDetailScreen',
        params: { contact: JSON.stringify(item) }
      })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список контактов</Text>
      <Text style={styles.subtitle}>Всего контактов: {contacts.length}</Text>
      
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item: Contact) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Назад"
            onPress={() => router.back()}
            color="#3498db"
          />
        </View>
        
        <View style={styles.buttonWrapper}>
          <Button
            title="На главную"
            onPress={() => router.push('/')}
            color="#2ecc71"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  arrow: {
    fontSize: 24,
    color: '#95a5a6',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});