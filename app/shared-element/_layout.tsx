import { Stack } from "expo-router";
import React from "react";

export default function SharedElementLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Dùng transparent background để không bị nhảy màu khi chuyển cảnh
        presentation: "transparentModal",
        animation: "fade",
      }}
    />
  );
}
