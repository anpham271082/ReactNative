// ButtonGrid.tsx
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-reanimated";
import { RootStackParamList } from "../types/Navigations";

// 2️⃣ Kiểu cho button
type ButtonRoute = keyof RootStackParamList;

const buttonList: {
  text: string;
  color: string;
  route: ButtonRoute;
  visible: boolean;
}[] = [
  { text: "MVVM", color: "#2196F3", route: "ExampleMVVM3", visible: true },
  { text: "Hilt MVVM", color: "#2196F3", route: "ExampleHiltMVVM", visible: true },
  { text: "Room MVVM", color: "#607D8B", route: "ExampleRoomMVVM", visible: true },
  { text: "Slide Image", color: "#607D8B", route: "ExampleSlideImage", visible: true },
  { text: "Swipe Card", color: "#9C27B0", route: "ExampleSwipeCard", visible: true },
  { text: "Login Register", color: "#9C27B0", route: "ExampleLoginRegister", visible: true },
  { text: "Shared Element", color: "#FFC107", route: "shared-element", visible: true },
  { text: "Card Flip", color: "#FFC107", route: "CardFlip", visible: true },
  { text: "Fragmented Image", color: "#003088", route: "FragmentedImageScreen", visible: true },
  { text: "Login Register", color: "#003088", route: "LoginScreen", visible: true },
  { text: "Swipe Card", color: "#880088", route: "SwipeCard", visible: true },
  { text: "Slide Image", color: "#880088", route: "SlideImage", visible: true },
  { text: "Movie", color: "#2196F3", route: "(movie_tabs)", visible: true },
];

// Lấy chiều rộng màn hình
const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_PADDING = 24;
const BUTTON_SPACING = 16; // khoảng cách giữa 2 button
const BUTTON_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - BUTTON_SPACING) / 2;

// 3️⃣ Component chính ButtonGrid
export default function ButtonGrid() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Chia đôi thành rows 2 button/row
  const rows = [];
  for (let i = 0; i < buttonList.length; i += 2) {
    rows.push(buttonList.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((button, index) => (
            <AnimatedIconButton
              key={index}
              text={button.text}
              color={button.color}
              visible={button.visible}
              onPress={() => navigation.navigate(button.route)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

// 4️⃣ Component button có animation khi nhấn
function AnimatedIconButton({
  text,
  color,
  visible,
  onPress,
}: {
  text: string;
  color: string;
  visible: boolean;
  onPress: () => void;
}) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onPress());
  };

  if (!visible) return <View style={{ width: BUTTON_WIDTH }} />;

  return (
    <Animated.View style={{ transform: [{ scale }], width: BUTTON_WIDTH }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={handlePress}
      >
        <Ionicons name="share-social-outline" size={20} color="white" />
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// 5️⃣ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
  },
});
