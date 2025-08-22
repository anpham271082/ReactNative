import { sharedTransition } from '@/components/CustomTransition';
import { RootStackParamList } from '@/types/NavigationShareElement';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

type ImageDetailsRouteProp = RouteProp<RootStackParamList, 'ImageDetails'>;

interface ImageDetailsProps {
  route: ImageDetailsRouteProp;
}

const ImageDetails = ({ route }: ImageDetailsProps) => {
  const { item } = route.params;

  // Log focus/unfocus của Details
  useFocusEffect(
    useCallback(() => {
      console.log(`📌 ImageDetails (${item.id}) is focused`);
      return () => {
        console.log(`➡️ Leaving ImageDetails (${item.id})`);
      };
    }, [item.id])
  );

  return (
    <View style={styles.container}>
      <Animated.Image
        sharedTransitionTag={item.id}
        sharedTransitionStyle={sharedTransition}
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.detailsText}>{item.details}</Text>
      </View>
    </View>
  );
};

export default ImageDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },
  infoContainer: { padding: 16 },
  detailsText: { fontSize: 16, marginVertical: 10 },
  titleText: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  image: {
    height: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width,
    borderRadius: 12,
  },
});
