import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "./globals.css";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden />
      <Stack>
        {/* Màn hình khởi đầu là ButtonGrid */}
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />

        {/* Thêm screen trỏ tới tab layout */}
        <Stack.Screen
          name="(movie_tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="movie/[IdMovie]"
          options={{ headerShown: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}


{/*export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(movie_tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[IdMovie]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
    
  );
}*/}

