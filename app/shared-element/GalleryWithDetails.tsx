import { sharedTransition } from '@/components/CustomTransition';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    Extrapolate,
    FadeIn,
    FadeOut,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { ImageItem, images } from '../data/images';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const IMAGE_HEIGHT = SCREEN_WIDTH;

const GalleryWithDetails = () => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Parallax hiệu ứng mượt
  const parallaxStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-200, 0, 200],
      [1.4, 1, 0.9], // zoom in khi kéo xuống, thu nhỏ khi kéo lên
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [-200, 0, 200],
      [-50, 0, 50],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const renderItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => {
        scrollY.value = 0;
        setSelectedItem(item);
      }}
    >
      <Animated.Image
        sharedTransitionTag={item.id}
        sharedTransitionStyle={sharedTransition}
        source={{ uri: item.image }}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  if (selectedItem) {
    // 🔹 Details with Parallax Scroll
    return (
      <View style={styles.detailsContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedItem(null)}
        >
          <Text style={{ fontSize: 16 }}>⬅ Back</Text>
        </TouchableOpacity>

        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          {/* Bọc image trong Animated.View để tránh conflict */}
          <Animated.View style={parallaxStyle}>
            <Animated.Image
              sharedTransitionTag={selectedItem.id}
              sharedTransitionStyle={sharedTransition}
              source={{ uri: selectedItem.image }}
              style={styles.detailsImage}
              resizeMode="cover"
            />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            style={styles.infoContainer}
          >
            <Text style={styles.titleText}>{selectedItem.title}</Text>
            <Text style={styles.detailsText}>{selectedItem.details}</Text>
            <Text style={styles.detailsText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              viverra lorem nec libero egestas, eu fermentum lacus vehicula.
              Quisque sed semper nulla. Pellentesque porta felis sit amet
              pharetra tincidunt. Integer eget purus nec justo egestas
              venenatis.
            </Text>
            <Text style={styles.detailsText}>
              Suspendisse non justo eu ligula scelerisque hendrerit. Ut ut
              lacinia mi. Nam bibendum purus nec tortor varius, vel convallis
              nulla eleifend. Proin vel magna in ipsum tristique eleifend.
            </Text>
            <Text style={styles.detailsText}>
              (Scroll more để thấy parallax hoạt động mượt mà 🚀)
            </Text>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  // 🔹 Gallery
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

export default GalleryWithDetails;

const styles = StyleSheet.create({
  container: { padding: 8 },
  itemContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 1 },

  detailsContainer: { flex: 1, backgroundColor: '#fff' },
  detailsImage: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
  },
  infoContainer: { padding: 16 },
  titleText: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  detailsText: { fontSize: 16, marginVertical: 10, lineHeight: 22 },
  backButton: {
    padding: 12,
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});
