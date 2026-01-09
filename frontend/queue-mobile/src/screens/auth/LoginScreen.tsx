import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// --- THEME ---
const COLORS = {
  primary: "#047857", // Brand Emerald Green (Replaces Airbnb Red)
  text: "#111827",
  subText: "#6B7280",
  border: "#D1D5DB", // Slightly darker border for inputs
  surface: "#FFFFFF",
  bg: "#FFFFFF",
};

// --- COMPONENT: SOCIAL BUTTON ---
const SocialButton = ({ icon, label, onPress, isBrandIcon = true }: any) => (
  <TouchableOpacity
    style={styles.socialBtn}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.socialIconWrapper}>
      <Ionicons name={icon} size={20} color="#111" />
    </View>
    <Text style={styles.socialBtnText}>{label}</Text>
  </TouchableOpacity>
);

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    // Navigate to Main App on success
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* 1. HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
        >
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log in or sign up</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {/* 2. THE INPUT BOX (Split Style) */}
          <Text style={styles.welcomeText}>Welcome to Queue</Text>

          <View style={styles.inputContainer}>
            {/* Top Half: Country Code */}
            <View style={styles.inputTop}>
              <Text style={styles.inputLabel}>Country/Region</Text>
              <View style={styles.countryRow}>
                <Text style={styles.countryText}>India (+91)</Text>
                <Ionicons name="chevron-down" size={16} color={COLORS.text} />
              </View>
            </View>

            <View style={styles.inputDivider} />

            {/* Bottom Half: Phone Number */}
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.textInput}
                placeholder="Phone number"
                placeholderTextColor={COLORS.subText}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus
              />
            </View>
          </View>

          <Text style={styles.helperText}>
            We'll call or text you to confirm your number. Standard message and
            data rates apply.
          </Text>

          {/* 3. PRIMARY ACTION */}
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          {/* 4. DIVIDER */}
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          {/* 5. SOCIAL OPTIONS */}
          <View style={styles.socialStack}>
            <SocialButton
              icon="mail-outline"
              label="Continue with email"
              onPress={() => {}}
              isBrandIcon={false}
            />
            <SocialButton
              icon="logo-apple"
              label="Continue with Apple"
              onPress={() => {}}
            />
            <SocialButton
              icon="logo-google"
              label="Continue with Google"
              onPress={() => {}}
            />
            <SocialButton
              icon="logo-facebook"
              label="Continue with Facebook"
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  closeBtn: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  content: {
    padding: 24,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 24,
  },

  // INPUT CONTAINER STYLES
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  inputTop: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
  },
  inputLabel: {
    fontSize: 12,
    color: COLORS.subText,
    marginBottom: 4,
  },
  countryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryText: {
    fontSize: 16,
    color: COLORS.text,
  },
  inputDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  inputBottom: {
    paddingHorizontal: 16,
    paddingVertical: 14, // Slightly taller for phone input
    backgroundColor: "#FFF",
  },
  textInput: {
    fontSize: 16,
    color: COLORS.text,
    height: 24,
    padding: 0, // Remove default Android padding
  },

  helperText: {
    fontSize: 12,
    color: COLORS.subText,
    lineHeight: 18,
    marginBottom: 24,
  },

  // BUTTONS
  continueBtn: {
    backgroundColor: COLORS.primary, // Emerald Green
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    // Soft shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // OR DIVIDER
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: COLORS.subText,
  },

  // SOCIAL STACK
  socialStack: {
    gap: 12, // Space between buttons
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center", // Center vertically
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.text, // Darker border like reference
    backgroundColor: "#FFF",
    position: "relative", // For icon positioning
  },
  socialIconWrapper: {
    position: "absolute",
    left: 20, // Pin icon to left
  },
  socialBtnText: {
    flex: 1,
    textAlign: "center", // Center text in remaining space
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
});
