import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Главная',
          headerStyle: { backgroundColor: '#f0f8ff' },
          headerTintColor: '#2c3e50',
        }} 
      />
      <Stack.Screen 
        name="ContactListScreen" 
        options={{ 
          title: 'Список контактов',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#2c3e50',
        }} 
      />
      <Stack.Screen 
        name="ContactDetailScreen" 
        options={{ 
          title: 'Детали контакта',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#2c3e50',
        }} 
      />
    </Stack>
  );
}