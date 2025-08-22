import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.6;

const initialCards = [
  { id: 1, image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg", text: "Mountain View" },
  { id: 2, image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg", text: "City Lights" },
  { id: 3, image: "https://images.pexels.com/photos/355423/pexels-photo-355423.jpeg", text: "Beach Sunset" },
  { id: 4, image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg", text: "Cute Cat" },
];

// Tách CardItem ra component riêng để dùng hook
function CardItem({ card }: { card: typeof initialCards[0] }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.card}>
      {loading && (
        <View style={styles.loadingPlaceholder}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <ImageBackground
        source={{ uri: card.image }}
        style={styles.card}
        imageStyle={{ borderRadius: 16 }}
        onLoadEnd={() => setLoading(false)}
      >
        <View style={styles.cardOverlay}>
          <Text style={styles.text}>{card.text}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default function SwipeCard() {
  const [cards, setCards] = useState(initialCards);
  const [swiperKey, setSwiperKey] = useState(0);

  const onSwipedAll = () => {
    setCards(initialCards);
    setSwiperKey((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.swiperWrapper, { transform: [{ translateX: -20 }] }]}>
        <Swiper
          key={swiperKey}
          cards={cards}
          renderCard={(card) => <CardItem card={card} />}
          stackSize={3}
          stackSeparation={15}
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          backgroundColor="transparent"
          cardVerticalMargin={0}
          containerStyle={{ alignItems: "center" }}
          onSwipedAll={onSwipedAll}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: { backgroundColor: "red", color: "white", fontSize: 24 },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: { backgroundColor: "green", color: "white", fontSize: 24 },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#333", justifyContent: "center", alignItems: "center" },
  swiperWrapper: { width: CARD_WIDTH, height: CARD_HEIGHT, justifyContent: "center", alignItems: "center" },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  loadingPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  cardOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  text: { fontSize: 24, color: "#fff", fontWeight: "bold" },
});
