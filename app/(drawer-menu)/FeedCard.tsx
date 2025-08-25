// FeedCard.tsx
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function FeedCard({ item, index }: any) {
  const cardOpacity = useSharedValue(0);
  const cardTranslate = useSharedValue(30);

  useEffect(() => {
    cardOpacity.value = withDelay(index * 150, withTiming(1, { duration: 600 }));
    cardTranslate.value = withDelay(index * 150, withTiming(0, { duration: 600 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslate.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Image source={{ uri: item.img }} style={styles.cardImg} />
      <View style={{ padding: 12 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  cardImg: { width: '100%', height: width * 0.5 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  desc: { fontSize: 14, color: '#666' },
});
