import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Лаунчскрин',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="home" 
        options={{ 
          title: 'Галерея',
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}