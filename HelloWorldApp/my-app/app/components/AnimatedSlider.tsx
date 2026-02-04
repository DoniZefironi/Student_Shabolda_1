import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

const images = [
  'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w-800',
  'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800',
];

const titles = [
  "Звездная ночь",
  "Тайная вечеря",
  "Мона Лиза",
  "Сотворение Адама",
  "Крик",
  "Подсолнухи"
];

const descriptions = [
  "Винсент Ван Гог, 1889",
  "Леонардо да Винчи, 1495-1498",
  "Леонардо да Винчи, 1503-1506",
  "Микеланджело, 1512",
  "Эдвард Мунк, 1893",
  "Винсент Ван Гог, 1888"
];

const AnimatedSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
  const listener = scrollX.addListener(({ value }) => {
    const index = Math.round(value / windowWidth);
    setCurrentIndex(index);
  });

  return () => {
    scrollX.removeListener(listener);
  };
}, [scrollX, windowWidth]);

  const handleImagePress = () => {
    // Анимация нажатия
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {images.map((image, imageIndex) => {
            // Анимация для каждого слайда
            const inputRange = [
              (imageIndex - 1) * windowWidth,
              imageIndex * windowWidth,
              (imageIndex + 1) * windowWidth,
            ];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                style={[
                  styles.slide,
                  { 
                    width: windowWidth,
                    opacity,
                    transform: [{ scale }],
                  }
                ]}
                key={imageIndex}
              >
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={handleImagePress}
                >
                  <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Image 
                      source={{ uri: image }} 
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <View style={styles.overlay}>
                      <Text style={styles.title}>{titles[imageIndex]}</Text>
                      <Text style={styles.description}>
                        {descriptions[imageIndex]}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
        
        {/* Индикаторы слайдов */}
        <View style={styles.indicatorContainer}>
          {images.map((_, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [8, 20, 8],
              extrapolate: "clamp"
            });

            const opacity = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"
            });

            return (
              <Animated.View
                key={imageIndex}
                style={[
                  styles.indicator,
                  { 
                    width,
                    opacity,
                  }
                ]}
              />
            );
          })}
        </View>
        
        {/* Номер текущего слайда */}
        <Animated.View style={styles.counterContainer}>
            <Text style={styles.counterText}>
            {currentIndex + 1} / {images.length}
            </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewStyle: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e94560",
    marginHorizontal: 4,
  },
  counterContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  counterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AnimatedSlider;