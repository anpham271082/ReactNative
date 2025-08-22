import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function DetailScreen() {
  const router = useRouter();
  const { id, color, img } = useLocalSearchParams<{
    id: string;
    color: string;
    img: string;
  }>();

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Animated.Image
        entering={FadeInDown.duration(400)}
        exiting={FadeOutDown}
        source={{ uri: img }}
        style={styles.img}
        resizeMode="cover"
      />
      <Animated.Text
        entering={FadeInUp.delay(200)}
        style={styles.text}
      >
        Detail Screen - Item {id}
      </Animated.Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: width - 60,
    height: 300,
    borderRadius: 20,
    marginTop: 150,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
