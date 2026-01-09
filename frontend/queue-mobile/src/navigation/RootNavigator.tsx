import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen Imports
import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/auth/LoginScreen";
import HospitalDetailsScreen from "../screens/hospital/HospitalDetailsScreen";
import BookingScreen from "../screens/booking/BookingScreen"; // <--- New Import

// Define all routes here
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  HospitalDetails: { id: string };
  Booking: { doctorId: string }; // <--- New Type
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // Prototype: Set to true to bypass login for now
  const isLoggedIn = true;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          {/* Main App (Tabs) */}
          <Stack.Screen name="Main" component={BottomTabs} />

          {/* Details Screen (Slide from Right) */}
          <Stack.Screen
            name="HospitalDetails"
            component={HospitalDetailsScreen}
            options={{ animation: "slide_from_right" }}
          />

          {/* Booking Screen (Slide from Bottom - Modal Feel) */}
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{
              animation: "slide_from_bottom",
              presentation: "modal", // Optional: Makes it feel like a focused task
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
