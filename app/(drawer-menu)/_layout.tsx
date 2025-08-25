import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import ProfileScreen from './(menu)/profile';
import SettingsScreen from './(menu)/settings';
import HomeTabs from './HomeTabs';

const Drawer = createDrawerNavigator();

// ================== Custom Drawer ==================
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>An Pham</Text>
        <Text style={styles.userEmail}>ngocanphamit271082@gmail.com</Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        onPress={() => alert('Logged out!')}
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
      />
    </DrawerContentScrollView>
  );
}

// ================== Drawer Menu ==================
export default function DrawerMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#555' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#4A90E2',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userName: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  userEmail: {
    color: '#000',
    fontSize: 14,
    opacity: 0.8,
  },
});
