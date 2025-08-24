import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Button, Easing, StyleSheet, Text, TextInput, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function AdvancedQRCodeSafe() {
  const [text, setText] = useState('Pham Ngoc An');
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const qrRef = useRef<QRCode>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  // Request media permission
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Safe QR value
  const safeQRCodeValue = (val: string) => (val.trim() !== '' ? val : ' ');

  // Lưu QR Code
  const saveQRCode = async () => {
    if (!qrRef.current) return;
    if (!hasPermission) {
      Alert.alert('Permission required', 'Please allow media library access to save QR Code.');
      return;
    }

    (qrRef.current as any).toDataURL((data: string) => {
    const saveAsync = async () => {
      try {
        const filename = FileSystem.cacheDirectory + 'qr.png';
        await FileSystem.writeAsStringAsync(filename, data, { encoding: FileSystem.EncodingType.Base64 });
        await MediaLibrary.saveToLibraryAsync(filename);
        Alert.alert('Saved', 'QR Code saved to gallery!');
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Failed to save QR Code.');
      }
    };
    saveAsync();
  });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Advanced QR Code (Save)</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text or URL"
        value={text}
        onChangeText={setText}
      />

      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <QRCode
          value={safeQRCodeValue(text)}
          size={220}
          linearGradient={['#4c669f', '#3b5998', '#192f6a']}
          logo={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          logoSize={50}
          logoBackgroundColor="transparent"
          getRef={(c) => (qrRef.current = c)}
        />
      </Animated.View>

      <View style={{ marginTop: 16, width: '100%' }}>
        <Button title="Save QR Code to Gallery" onPress={saveQRCode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#f5f5f5' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
