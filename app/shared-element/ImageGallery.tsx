import { RootStackParamList } from '@/types/NavigationShareElement';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { sharedTransition } from '../../components/CustomTransition';
import { ImageItem, images } from '../data/images';
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ImageGallery'
>;

const ImageGallery = () => {
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    useCallback(() => {
      console.log('📌 ImageGallery is focused');
      console.log('Current routes in stack:', navigation.getState().routes.map(r => r.name));

      return () => {
        console.log('➡️ Leaving ImageGallery');
        console.log('Current routes in stack:', navigation.getState().routes.map(r => r.name));
      };
    }, [navigation])
  );
  const renderItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ImageDetails', { item })}
    >
      <Animated.Image
        sharedTransitionTag={item.id}
        sharedTransitionStyle={sharedTransition}
        source={{ uri: item.image }}
        style={styles.image}
      />
      
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      numColumns={3}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  container: { padding: 8 },
  itemContainer: { flex: 1, margin: 4, borderRadius: 8, overflow: 'hidden' },
  image: { width: '100%', aspectRatio: 1 },
});
