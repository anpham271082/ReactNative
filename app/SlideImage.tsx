import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Image as RNImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

interface DataItem {
  image: any; // local require hoặc { uri }
  title: string;
}

const data: DataItem[] = [
  { image: require("../assets/pic1.jpg"), title: "First Picture" },
  { image: require("../assets/pic2.jpg"), title: "Second Picture" },
  { image: require("../assets/pic3.jpg"), title: "Third Picture" },
  { image: require("../assets/pic4.jpg"), title: "Fourth Picture" },
  { image: require("../assets/pic5.jpg"), title: "Fifth Picture" },
  {
    image: {
      uri: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    },
    title: "Mountain",
  },
  {
    image: {
      uri: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    },
    title: "Forest",
  },
];

export default function SlideImage() {
  const router = useRouter();
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  // lấy đúng uri để truyền sang zoom.tsx
                  const uri =
                    typeof item.image === "number"
                      ? RNImage.resolveAssetSource(item.image).uri
                      : item.image?.uri ?? "";
                  router.push({ pathname: "/ZoomImage", params: { image: uri } });
                }}
              >
                <AnimatedItem item={item} index={index} scrollX={scrollX} />
              </TouchableOpacity>
            );
          }}
        />
        <Dots data={data} scrollX={scrollX} />
      </View>
    </View>
  );
}

interface AnimatedItemProps {
  item: DataItem;
  index: number;
  scrollX: SharedValue<number>;
}

function AnimatedItem({ item, index, scrollX }: AnimatedItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];
    const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8], "clamp");
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <View style={styles.innerItem}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientOverlay}
        >
          <Text style={styles.title}>{item.title}</Text>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

function Dots({
  data,
  scrollX,
}: {
  data: DataItem[];
  scrollX: SharedValue<number>;
}) {
  return (
    <View style={styles.dotsContainer}>
      {data.map((_, index) => (
        <Dot key={index} index={index} scrollX={scrollX} />
      ))}
    </View>
  );
}

function Dot({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const widthDot = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
      [8, 16, 8],
      "clamp"
    );
    return { width: widthDot };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  innerItem: {
    width: "100%",
    height: "80%",
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    position: "absolute",
    bottom: 0,
    fontSize: 22,
    fontWeight: "bold",
    color: "whitesmoke",
    zIndex: 1,
    width: "100%",
    textAlign: "center",
    paddingVertical: 30,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  dot: {
    height: 8,
    backgroundColor: "white",
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
