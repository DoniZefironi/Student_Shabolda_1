import React, { useRef, useEffect } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Animated,
  Easing,
  View,
} from 'react-native';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  style?: any;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  title, 
  onPress, 
  color = '#e94560',
  style 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    // Анимация вращения и отскока
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      rotateAnim.setValue(0);
      onPress();
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        style,
        {
          transform: [
            { scale: scaleAnim },
            { translateY: bounceAnim },
          ]
        }
      ]}
    >
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Animated.View 
          style={[
            styles.buttonContent,
            {
              transform: [{ rotate: rotateInterpolate }]
            }
          ]}
        >
          <Text style={styles.buttonText}>{title}</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✨</Text>
          </View>
        </Animated.View>
        
        {/* Эффект свечения */}
        <Animated.View 
          style={[
            styles.glowEffect,
            {
              opacity: scaleAnim.interpolate({
                inputRange: [0.95, 1],
                outputRange: [0.7, 0],
              }),
            }
          ]}
        />
      </TouchableOpacity>
      
      {/* Волна при нажатии */}
      <RippleEffect />
    </Animated.View>
  );
};

const RippleEffect = () => {
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => { // Добавлен useEffect
    Animated.loop(
      Animated.parallel([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  return (
    <Animated.View 
      style={[
        styles.ripple,
        {
          transform: [{ scale: rippleScale }],
          opacity: rippleOpacity,
        }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  glowEffect: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: '#e94560',
    borderRadius: 35,
    zIndex: -1,
  },
  ripple: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#e94560',
    zIndex: -2,
  },
});

export default AnimatedButton;