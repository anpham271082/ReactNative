import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import FeedScreen from './feed';
import MessagesScreen from './messages';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const items = [
  { key: 'feed', icon: 'newspaper-outline', color: '#FF4747' },
  { key: 'messages', icon: 'chatbubbles-outline', color: '#47A0FF' },
];

// ================== Animated Bottom Bar ==================
function AnimatedBottomBar({ state, navigation }: any) {
  const indicatorX = React.useRef(new Animated.Value(0)).current;
  const flashAnim = React.useRef(new Animated.Value(0.7)).current;
  const itemWidth = width / items.length;

  React.useEffect(() => {
    Animated.timing(indicatorX, {
      toValue: state.index * itemWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [state.index]);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flashAnim, { toValue: 0.5, duration: 1000, useNativeDriver: false }),
        Animated.timing(flashAnim, { toValue: 0.7, duration: 1000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  return (
    <View style={bottomBarStyles.container}>
      <View style={bottomBarStyles.row}>
        {items.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={bottomBarStyles.item}
            onPress={() => navigation.navigate(item.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon as any}
              size={28}
              color={state.index === i ? item.color : '#fff'}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Indicator */}
      <Animated.View
        style={[
          bottomBarStyles.indicator,
          {
            backgroundColor: items[state.index].color,
            transform: [{ translateX: indicatorX }],
            opacity: flashAnim,
          },
        ]}
      >
        {/* Triangle flare */}
        <Animated.View
          style={[
            bottomBarStyles.triangle,
            {
              borderBottomColor: items[state.index].color,
              opacity: flashAnim,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const bottomBarStyles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#212121',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 6,
    width: width / items.length / 2,
    borderRadius: 3,
    left: width / items.length / 4,
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    top: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

// ================== Bottom Tabs ==================
export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AnimatedBottomBar {...props} />}
    >
      <Tab.Screen name="feed" component={FeedScreen} />
      <Tab.Screen name="messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
}