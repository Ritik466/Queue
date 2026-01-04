// src/navigation/BottomTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../theme"; // adjust path if needed

import HomeScreen from "../screens/home/HomeScreen";
import QueueScreen from "../screens/queue/QueueScreen";
import CreateScreen from "../screens/create/CreateScreen";
import MessagesScreen from "../screens/messages/MessagesScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // FAB size
  const FAB_SIZE = 64;
  const fabBottom = Math.max(insets.bottom + 12, 18);

  return (
    <View style={styles.wrapper}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName: any = "";
            if (route.name === "Home") iconName = "home-outline";
            if (route.name === "Queue") iconName = "time-outline";
            if (route.name === "Messages") iconName = "chatbubble-outline";
            if (route.name === "Profile") iconName = "person-outline";
            if (!iconName) return null;

            return (
              <Ionicons
                name={iconName}
                size={22}
                color={focused ? colors.textPrimary : colors.textMuted}
              />
            );
          },
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: colors.textPrimary,
          tabBarInactiveTintColor: colors.textMuted,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Queue" component={QueueScreen} />
        {/* Create tab reserved so jumpTo works */}
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            tabBarLabel: "", // keep tab label empty, we will use FAB
            // Hide default button icon area
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      {/* FAB - centered, uses jumpTo to switch to Create tab */}
      <View
        pointerEvents="box-none"
        style={[styles.fabContainer, { bottom: fabBottom }]}
      >
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.9}
          onPress={() => {
            // jumpTo ensures we hit the tab navigator's Create tab
            navigation.jumpTo?.("Create");
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {/* Outer subtle stroke & shadow */}
          <LinearGradient
            colors={["#ffffff", "#f7f7f7"]}
            start={[0, 0]}
            end={[0, 1]}
            style={[
              styles.fabOuter,
              { width: FAB_SIZE, height: FAB_SIZE, borderRadius: FAB_SIZE / 2 },
            ]}
          >
            {/* Inner circle with gradient and icon */}
            <LinearGradient
              colors={["#ffffff", "#f0f0f0"]}
              style={[
                styles.fabInner,
                {
                  width: FAB_SIZE - 10,
                  height: FAB_SIZE - 10,
                  borderRadius: (FAB_SIZE - 10) / 2,
                },
              ]}
            >
              <View style={styles.fabIconWrap}>
                <Ionicons name="add" size={28} color="#111827" />
              </View>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabBar: {
    height: Platform.select({ ios: 74, android: 64 }),
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#fff",
    paddingBottom: 12,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },

  fabContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    // bottom set dynamically
    elevation: 10,
  },

  fabOuter: {
    alignItems: "center",
    justifyContent: "center",
    // stroke
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 12,
  },

  fabInner: {
    alignItems: "center",
    justifyContent: "center",
    // inner subtle highlight - emulate inner shadow by overlay
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: "#fff",
  },

  fabIconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
