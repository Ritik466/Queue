import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS } from "../../theme";

export default function EditProfileScreen({ navigation }: any) {
  const [name, setName] = useState("Dr. Trafalgar Law");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("law@heartpirates.com");
  const [license, setLicense] = useState("MED-2025-X99");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.saveLink}>Done</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* AVATAR EDIT */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>TL</Text>
              <View style={styles.camBadge}>
                <Ionicons name="camera" size={14} color="#FFF" />
              </View>
            </View>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </View>

          {/* FORM */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#94A3B8" />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#94A3B8" />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#94A3B8" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Medical License ID</Text>
            <View style={[styles.inputContainer, styles.disabledInput]}>
              <Ionicons name="card-outline" size={20} color="#94A3B8" />
              <TextInput
                style={[styles.input, { color: "#94A3B8" }]}
                value={license}
                editable={false}
              />
              <Ionicons name="lock-closed" size={16} color="#94A3B8" />
            </View>
            <Text style={styles.helperText}>
              License ID cannot be changed. Contact support for updates.
            </Text>
          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  saveLink: { fontSize: 16, fontWeight: "600", color: COLORS.primary },

  scroll: { padding: 24 },

  avatarSection: { alignItems: "center", marginBottom: 32 },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#FFF",
    ...SHADOWS.light,
  },
  avatarText: { fontSize: 32, fontWeight: "700", color: COLORS.primary },
  camBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  changePhotoText: { color: COLORS.primary, fontWeight: "600", fontSize: 14 },

  formGroup: { marginBottom: 24 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  input: { flex: 1, fontSize: 16, color: "#0F172A", height: "100%" },
  disabledInput: { backgroundColor: "#F1F5F9", borderColor: "#F1F5F9" },
  helperText: { fontSize: 12, color: "#94A3B8", marginTop: 6, marginLeft: 4 },

  saveBtn: {
    backgroundColor: "#0F172A",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    shadowColor: "#0F172A",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  saveBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});
