import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieProfile = () => {
  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Header fade in + slide down
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Avatar scale + rotate
    Animated.spring(scaleAnim, {
      toValue: 1,
      damping: 10,
      useNativeDriver: true,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-20deg", "0deg"],
  });

  const infoCards = [
    { icon: "film-outline", label: "Favorite Movies", value: "128" },
    { icon: "star-outline", label: "Reviews", value: "42" },
    { icon: "heart-outline", label: "Liked", value: "310" },
  ];

  return (
    <SafeAreaView
      className="bg-primary flex-1 px-8"
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-row justify-between items-center mt-4"
        >
          <Text className="text-white text-xl font-bold">Profile</Text>
          <Ionicons name="settings-outline" size={26} color="#fff" />
        </Animated.View>

        {/* Avatar + Name + Description */}
        <View className="items-center mt-8 mb-20">
          <Animated.View
            style={{ transform: [{ scale: scaleAnim }, { rotate }] }}
            className="relative"
          >
            <Image
              source={icons.person}
              style={{ width: 120, height: 120, tintColor: "white" }}
              className="rounded-full border-4 border-white"
            />
          </Animated.View>

          <Text className="text-white text-2xl font-bold mt-4">John Doe</Text>
          <Text className="text-gray-400 text-base mt-1">Movie Enthusiast 🎬</Text>
        </View>

        {/* Info Cards */}
        <View className="gap-4 mb-6">
          {infoCards.map((item, idx) => (
            <Animated.View
              key={idx}
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="p-4 rounded-2xl flex-row justify-between items-center border border-white/10 bg-white/5"
            >
              <View className="flex-row items-center gap-3">
                <Ionicons name={item.icon as any} size={22} color="#fff" />
                <Text className="text-white text-base">{item.label}</Text>
              </View>
              <Text className="text-white font-bold text-lg">{item.value}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity className="bg-red-500 p-4 rounded-2xl flex-row justify-center items-center gap-2">
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieProfile;
