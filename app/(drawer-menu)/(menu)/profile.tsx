import React from 'react';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{fontSize: 22, fontWeight: '600'}}>👤 Profile Screen</Text>
      </View>
    );
}