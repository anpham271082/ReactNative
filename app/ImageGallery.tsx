import React from 'react';

import { sharedTransition } from '@/components/CustomTransition';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { ImageItem, images } from './data/images';

const ImageGallery = () => {
  const navigation = useNavigation();
  const renderItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => 
        router.push(`/ImageDetails/${item.id}`)
      }>
      <Animated.Image
        sharedTransitionStyle={sharedTransition}
        sharedTransitionTag={item.id}
        source={{uri: item.image}}
        style={styles.image}
      />
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={images}
      numColumns={3}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default ImageGallery;
const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
