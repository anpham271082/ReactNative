// MessagesScreen.tsx
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const messagesData = [
  {
    id: '1',
    name: 'John Doe',
    message: 'Hey! Are you available for a meeting tomorrow?',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    unread: 2,
    bgColor: '#E3F2FD',
  },
  {
    id: '2',
    name: 'Alice Smith',
    message: 'Don’t forget to check the new design updates!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    unread: 0,
    bgColor: '#FCE4EC',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    message: 'Can you send me the report?',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    unread: 1,
    bgColor: '#FFF3E0',
  },
  {
    id: '4',
    name: 'Emma Watson',
    message: 'Let’s catch up this weekend 😄',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    unread: 0,
    bgColor: '#E8F5E9',
  },
];

function MessageCard({ item, index }: any) {
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withDelay(
      index * 150,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: anim.value,
    transform: [
      { translateY: (1 - anim.value) * 20 },
      { rotateZ: `${(1 - anim.value) * 2}deg` }, // slight tilt
    ],
  }));

  return (
    <Animated.View style={[styles.card, { backgroundColor: item.bgColor }, animatedStyle]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </Animated.View>
  );
}

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={messagesData}
        renderItem={({ item, index }) => <MessageCard item={item} index={index} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  cardContent: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  message: { fontSize: 14, color: '#555', marginTop: 2 },
  badge: {
    minWidth: 20,
    paddingHorizontal: 6,
    height: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
