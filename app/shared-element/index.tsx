import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const DATA = [
  { id: "1", color: "#FF6B6B", img: "https://picsum.photos/id/1011/600/600" },
  { id: "2", color: "#4ECDC4", img: "https://picsum.photos/id/1025/600/600" },
  { id: "3", color: "#556270", img: "https://picsum.photos/id/1035/600/600" },
];

export default function ListScreen() {
  const router = useRouter();

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/shared-element/detail",
              params: item,
            })
          }
        >
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.card, { backgroundColor: item.color }]}
          >
            <Image source={{ uri: item.img }} style={styles.img} />
            <Text style={styles.text}>Item {item.id}</Text>
          </Animated.View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: "center",
  },
  card: {
    width: width * 0.6,
    height: width * 0.6,
    marginVertical: 16,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    bottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
