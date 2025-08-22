import { RootStackParamList } from '@/types/NavigationShareElement';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import ImageDetails from './ImageDetails';
import ImageGallery from './ImageGallery';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function SharedElementLayout() {
  {/*return <GalleryWithDetails />;*/}
  
  return (
    <Stack.Navigator
      initialRouteName="ImageGallery" // 👈 đảm bảo Gallery luôn là screen gốc
      screenOptions={{
        headerShown: false,
        animation: 'fade', // cần để sharedTransition hoạt động
      }}
    >
      <Stack.Screen name="ImageGallery" component={ImageGallery} />
      <Stack.Screen name="ImageDetails" component={ImageDetails} />
    </Stack.Navigator>
  );
}