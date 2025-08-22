import { sharedTransition } from '@/components/CustomTransition';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { images } from '../data/images';

export default function ImageDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const item = images.find(img => img.id === id);

  if (!item) return null;

  return (
    <View style={styles.container}>
      <Animated.Image
        sharedTransitionTag={item.id}
        sharedTransitionStyle={sharedTransition}
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.detailsText}>{item.details}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: Dimensions.get('screen').width },
  infoContainer: { padding: 16 },
  titleText: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  detailsText: { fontSize: 16, marginVertical: 10 },
});
