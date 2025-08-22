import React from "react";
import { StyleSheet, View } from "react-native";
import FragmentedImage from "./FragmentedImage";

export default function FragmentedImageScreen() {
  return (
    <View style={styles.container}>
      {/* Dùng local image từ assets */}
      <FragmentedImage
        source={require("../assets/pic1.jpg")}
        rows={6}
        columns={6}
      />

      {/* Dùng online image (nếu muốn) */}
      {/*
      <FragmentedImage
        imageUri="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        rows={6}
        columns={6}
      />
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
