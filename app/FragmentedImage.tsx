import React, { useRef } from 'react';
import { Dimensions, Image, ImageSourcePropType, Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width: SCREEN_W } = Dimensions.get('window');

interface FragmentedImageProps {
  imageUri?: string;
  source?: ImageSourcePropType;
  rows?: number;
  columns?: number;
  size?: number;
}

const FragmentedImage: React.FC<FragmentedImageProps> = ({
  imageUri,
  source,
  rows = 5,
  columns = 5,
  size = SCREEN_W * 0.9,
}) => {
  const totalTiles = rows * columns;

  // ✅ Tạo shared values ở top-level
  const tilesRef = useRef(
    Array.from({ length: totalTiles }, () => useSharedValue({ x: 0, y: 0 }))
  );
  const tiles = tilesRef.current;

  const explode = () => {
    tiles.forEach(tile => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 150 + 50;
      tile.value = withTiming(
        { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance },
        { duration: 600, easing: Easing.out(Easing.exp) }
      );
    });

    setTimeout(() => {
      tiles.forEach(tile => {
        tile.value = withTiming(
          { x: 0, y: 0 },
          { duration: 600, easing: Easing.out(Easing.exp) }
        );
      });
    }, 1000);
  };

  const tileWidth = size / columns;
  const tileHeight = size / rows;

  const imageSource: ImageSourcePropType = source ? source : { uri: imageUri || '' };

  return (
    <Pressable onPress={explode}>
      <View style={{ width: size, height: size, flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: totalTiles }).map((_, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;

          const animatedStyle = useAnimatedStyle(() => {
            const tile = tiles[index].value;
            return { transform: [{ translateX: tile.x }, { translateY: tile.y }] };
          });

          return (
            <Animated.View
              key={index}
              style={[{ width: tileWidth, height: tileHeight, overflow: 'hidden' }, animatedStyle]}
            >
              <Image
                source={imageSource}
                style={{
                  width: size,
                  height: size,
                  position: 'absolute',
                  left: -col * tileWidth,
                  top: -row * tileHeight,
                }}
              />
            </Animated.View>
          );
        })}
      </View>
    </Pressable>
  );
};

export default FragmentedImage;
