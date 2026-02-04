import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Easing,
  Dimensions,
  SafeAreaView 
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LaunchScreen() {
  // Анимированные значения
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  const textAnim = useRef(new Animated.Value(-100)).current;
  
  useEffect(() => {
    // Запуск анимаций последовательно
    Animated.sequence([
      // Появление фона
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Анимация масштабирования и вращения логотипа
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      // Появление текста
      Animated.timing(textAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Появление кнопки
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Интерполяция для вращения
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleEnterApp = () => {
    // Анимация исчезновения
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Переход на главный экран после завершения анимации
      router.push('/home' as any)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        {/* Анимированный логотип */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: scaleAnim },
                { rotate: rotateInterpolate }
              ]
            }
          ]}
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>🎨</Text>
          </View>
          <View style={styles.logoRing} />
          <View style={styles.logoRing2} />
        </Animated.View>

        {/* Анимированный текст */}
        <Animated.View 
          style={[
            styles.textContainer,
            {
              transform: [{ translateY: textAnim }]
            }
          ]}
        >
          <Text style={styles.title}>Галерея искусств</Text>
          <Text style={styles.subtitle}>
            Исследуйте коллекцию шедевров мирового искусства
          </Text>
        </Animated.View>

        {/* Анимированная кнопка */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Animated.View style={styles.button}>
            <Animated.Text 
              style={styles.buttonText}
              onPress={handleEnterApp}
            >
              Войти в галерею
            </Animated.Text>
          </Animated.View>
          
          {/* Пульсирующая подсказка */}
          <PulsatingHint />
        </Animated.View>

        {/* Дополнительные анимационные элементы */}
        <FloatingElements />
      </Animated.View>
    </SafeAreaView>
  );
}

// Компонент с пульсирующей анимацией
const PulsatingHint = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.hint, { transform: [{ scale: pulseAnim }] }]}>
      <Text style={styles.hintText}>👇 Нажмите, чтобы начать</Text>
    </Animated.View>
  );
};

// Компонент с плавающими элементами
const FloatingElements = () => {
  const elements = [
    { id: 1, startY: 100, startX: 50, emoji: '🖼️' },
    { id: 2, startY: 200, startX: width - 80, emoji: '🎭' },
    { id: 3, startY: 300, startX: 30, emoji: '🏛️' },
    { id: 4, startY: 400, startX: width - 60, emoji: '📐' },
  ];

  return (
    <>
      {elements.map((element) => (
        <FloatingElement key={element.id} {...element} />
      ))}
    </>
  );
};

const FloatingElement = ({ startY, startX, emoji }: any) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const opacity = floatAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <Animated.View 
      style={[
        styles.floatingElement,
        {
          top: startY,
          left: startX,
          transform: [{ translateY }],
          opacity,
        }
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e94560',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  logoRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 2,
    top: -10,
    left: -10,
  },
  logoRing2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
    top: -20,
    left: -20,
  },
  logoText: {
    fontSize: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e94560',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  hintText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  floatingElement: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 30,
  },
});