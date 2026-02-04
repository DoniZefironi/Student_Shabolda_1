import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Animated,
  Easing,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AnimatedSlider from './components/AnimatedSlider';
import AnimatedButton from './components/AnimatedButton';

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    // Запуск анимаций при монтировании
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLike = () => {
    // Анимация для кнопки "лайк"
    const scaleAnim = new Animated.Value(1);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Добавление в избранное
    setFavorites(prev => [...prev, `Картина ${prev.length + 1}`]);
  };

  const handleShare = () => {
    alert('Поделиться галереей!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Анимированный заголовок */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.title}>Галерея искусств</Text>
          <Text style={styles.subtitle}>
            Шедевры мировой живописи
          </Text>
        </Animated.View>

        {/* Слайдер картин */}
        <AnimatedSlider />

        {/* Анимированные кнопки действий */}
        <Animated.View 
          style={[
            styles.actionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.buttonRow}>
            <AnimatedButton
              title="❤️ Добавить в избранное"
              onPress={handleLike}
              color="#e94560"
              style={styles.actionButton}
            />
            
            <AnimatedButton
              title="📤 Поделиться"
              onPress={handleShare}
              color="#3498db"
              style={styles.actionButton}
            />
          </View>
        </Animated.View>

        {/* Статистика */}
        <Animated.View 
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Картин</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>В избранном</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Художников</Text>
          </View>
        </Animated.View>

        {/* Список избранного */}
        {favorites.length > 0 && (
          <Animated.View style={styles.favoritesContainer}>
            <Text style={styles.sectionTitle}>Избранное</Text>
            {favorites.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.favoriteItem}
                activeOpacity={0.7}
              >
                <View style={styles.favoriteIcon}>
                  <Text style={styles.favoriteEmoji}>🖼️</Text>
                </View>
                <Text style={styles.favoriteText}>{item}</Text>
                <Text style={styles.favoriteArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  favoritesContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  favoriteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  favoriteEmoji: {
    fontSize: 20,
  },
  favoriteText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  favoriteArrow: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});