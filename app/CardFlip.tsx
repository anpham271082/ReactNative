import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function CardFlip() {
  const rotate = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
    rotate.value = withTiming(flipped ? 0 : 180, { duration: 600 });
  };

  // Front style
  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotate.value}deg` },
      { scale: withTiming(flipped ? 1.05 : 1, { duration: 300 }) },
    ],
    backfaceVisibility: 'hidden',
  }));

  // Back style
  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotate.value + 180}deg` },
      { scale: withTiming(flipped ? 1.05 : 1, { duration: 300 }) },
    ],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
  }));

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View>
          {/* Front */}
          <Animated.View style={[styles.card, frontAnimatedStyle]}>
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            {/* Shine layer */}
            <View style={styles.shine} />
            <Text style={styles.text}>Front</Text>
          </Animated.View>

          {/* Back */}
          <Animated.View style={[styles.card, backAnimatedStyle]}>
            <LinearGradient
              colors={['#ff7e5f', '#feb47b']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            {/* Shine layer */}
            <View style={styles.shine} />
            <Text style={styles.text}>Back</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.tip}>Tap card to flip</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  card: {
    width: 250,
    height: 350,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ rotate: '45deg' }],
  },
  text: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  tip: { marginTop: 20, fontSize: 18 },
});
