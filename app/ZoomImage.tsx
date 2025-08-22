// app/zoom.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

const SPRING = { damping: 18, stiffness: 180, mass: 0.8 };
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const MIN_SCALE = 1;
const MAX_SCALE = 5;

export default function ZoomScreen() {
  const { image } = useLocalSearchParams<{ image?: string }>();
  const router = useRouter();

  // Container size để clamp pan chính xác
  const [box, setBox] = useState({ w: SCREEN_W, h: SCREEN_H });
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setBox({ w: width, h: height });
  }, []);

  // Shared values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0); // radians
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // Snapshot khi gesture bắt đầu
  const startScale = useSharedValue(1);
  const startRot = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  // Clamp offset theo scale (xấp xỉ theo khung container "contain")
  const clampOffsets = () => {
    "worklet";
    const maxX = (box.w * (scale.value - 1)) / 2;
    const maxY = (box.h * (scale.value - 1)) / 2;
    // dùng spring để hồi mượt
    if (offsetX.value > maxX) offsetX.value = withSpring(maxX, SPRING);
    if (offsetX.value < -maxX) offsetX.value = withSpring(-maxX, SPRING);
    if (offsetY.value > maxY) offsetY.value = withSpring(maxY, SPRING);
    if (offsetY.value < -maxY) offsetY.value = withSpring(-maxY, SPRING);
  };

  // Pinch zoom
  const pinch = Gesture.Pinch()
    .onBegin(() => {
      startScale.value = scale.value;
    })
    .onUpdate((e) => {
      const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, startScale.value * e.scale));
      scale.value = next;
    })
    .onEnd(() => {
      // giữ trong biên + hồi pan vào khung
      if (scale.value < MIN_SCALE) scale.value = withSpring(MIN_SCALE, SPRING);
      if (scale.value > MAX_SCALE) scale.value = withSpring(MAX_SCALE, SPRING);
      clampOffsets();
    });

  // Rotate
  const rotate = Gesture.Rotation()
    .onBegin(() => {
      startRot.value = rotation.value;
    })
    .onUpdate((e) => {
      rotation.value = startRot.value + e.rotation;
    });

  // Pan
  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((e) => {
      // chỉ cho pan khi đã zoom
      if (scale.value > 1) {
        offsetX.value = startX.value + e.translationX;
        offsetY.value = startY.value + e.translationY;
      }
    })
    .onEnd(() => {
      clampOffsets();
    });

  // Double tap: zoom vào vị trí tap và đưa điểm tap tiến về giữa
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((e, success) => {
      if (!success) return;
      const cx = box.w / 2;
      const cy = box.h / 2;

      if (scale.value > 1) {
        // reset
        scale.value = withSpring(1, SPRING);
        offsetX.value = withSpring(0, SPRING);
        offsetY.value = withSpring(0, SPRING);
        rotation.value = withSpring(0, SPRING);
      } else {
        // zoom in
        scale.value = withSpring(2, SPRING);
        // tịnh tiến để điểm tap gần về center (xấp xỉ, cho cảm giác tự nhiên & mượt)
        const dx = cx - e.x;
        const dy = cy - e.y;
        offsetX.value = withSpring(dx, SPRING);
        offsetY.value = withSpring(dy, SPRING);
      }
    });

  // Kết hợp gesture
  const composed = Gesture.Simultaneous(pan, pinch, rotate, doubleTap);

  // Animated style: scale -> rotate -> translate (để pan tính theo pixel màn hình, ít "giật")
  const imgStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotation.value}rad` },
        { translateX: offsetX.value },
        { translateY: offsetY.value },
      ],
    };
  });

  return (
    <View style={styles.container} onLayout={onLayout}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} hitSlop={16}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <GestureDetector gesture={composed}>
        <Animated.Image
          // Lưu ý: đảm bảo truyền URI hợp lệ vào param "image"
          source={{ uri: image || "" }}
          style={[styles.image, { width: box.w, height: box.h }, imgStyle]}
          resizeMode="contain"
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  image: { },
});
