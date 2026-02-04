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
      <Text style={styles.title}>5 книжных новинок октября</Text>
      <View style={styles.containerInContainer}>
        <Text style={styles.link} onPress={openLink}>
          Читать далее
        </Text>
        <Text style={styles.subtitle}>"Кадиш.com" Натан Ингландер.</Text>
        <Text style={styles.subtitle}>Издательство "Книжники"</Text>
      </View>
      <View style={styles.containerInContainerBottom}>
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
    paddingTop: 50,
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#004749',
    marginBottom: 20,
  },
  containerInContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%', 
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 20,
    alignItems: 'center',
  },
  containerInContainerBottom: {
    flex: 1,
    backgroundColor: '#afafaf',
    width: '100%', 
    alignItems: 'center',
    padding: 24,
  },
  link: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
    textDecorationLine: 'underline',
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