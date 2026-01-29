import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const openLink = () => {
    Linking.openURL('https://example.com/news');
  };
  
  return (
    <LinearGradient
      colors={['#ffffff', '#07a0ff']} 
      style={styles.container}
    >
      <Text style={styles.title}>Журнал Bright</Text>
      <View style={styles.containerInContainer}>
        <Text style={styles.link} onPress={openLink}>
          Новости
        </Text>
        <Image 
          source={{ uri: 'https://brightmagazine.ru/wp-content/uploads/2025/12/asian-woman-wearing-japanese-traditional-kimono-fuji-mountain-sunset-kawaguchiko-lake-japan-600x400.jpg' }} 
          style={styles.image}
        />
        <Text style={styles.subtitle}>Превращаем стресс в своего помощника</Text>
        <Text style={styles.text}>
          Исследователи Йельского университета заявляют...
        </Text>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center', 
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#004749',
    textAlign: 'center',
    marginBottom: 20,
  },
  containerInContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '90%', 
    padding: 24,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  link: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f0f0f0', 
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});