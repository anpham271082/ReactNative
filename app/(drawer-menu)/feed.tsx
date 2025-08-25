// FeedScreen.tsx
import React, { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FeedCard from './FeedCard';

const feedData = [
  {
    id: '1',
    title: 'Breaking News',
    desc: 'React Native Expo 2025 update released 🚀',
    img: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'Design Trends',
    desc: 'Minimal UI + smooth animations are hot 🔥',
    img: 'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'AI News',
    desc: 'GPT-5 taking over daily tasks 🤖',
    img: 'https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    title: 'Travel Tips',
    desc: 'Top 10 destinations for 2025 🌴',
    img: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const { width } = Dimensions.get('window');

export default function FeedScreen() {
  // Header animation
  const headerOpacity = useSharedValue(0);
  const headerTranslate = useSharedValue(-30);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    headerTranslate.value = withTiming(0, { duration: 600 });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslate.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={styles.headerText}>📰 Today's Feed</Text>
      </Animated.View>

      {/* Feed List */}
      <FlatList
        data={feedData}
        renderItem={({ item, index }) => <FeedCard item={item} index={index} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefefe' },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: { fontSize: 26, fontWeight: '700', color: '#fff' },
});
