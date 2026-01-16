import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../theme";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";

export default function ClinicProfileScreen({ navigation }: any) {
  const [clinicName, setClinicName] = useState("Heart Pirates Clinic");
  const [specialty, setSpecialty] = useState("Cardiology & Surgery");
  const [fees, setFees] = useState("$150");

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Clinic Details" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Cover Photo Area */}
        <View style={styles.coverPhoto}>
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="camera" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Clinic Name</Text>
          <View style={styles.inputBox}>
            <Ionicons
              name="business-outline"
              size={20}
              color={COLORS.subText}
            />
            <TextInput
              style={styles.input}
              value={clinicName}
              onChangeText={setClinicName}
            />
          </View>

          <Text style={styles.label}>Specialty</Text>
          <View style={styles.inputBox}>
            <Ionicons name="medkit-outline" size={20} color={COLORS.subText} />
            <TextInput
              style={styles.input}
              value={specialty}
              onChangeText={setSpecialty}
            />
          </View>

          <Text style={styles.label}>Consultation Fees</Text>
          <View style={styles.inputBox}>
            <Ionicons name="cash-outline" size={20} color={COLORS.subText} />
            <TextInput
              style={styles.input}
              value={fees}
              onChangeText={setFees}
              keyboardType="numeric"
            />
          </View>

          {/* Business Hours (Static for UI Demo) */}
          <Text style={styles.label}>Business Hours</Text>
          <View style={styles.hoursCard}>
            <View style={styles.hourRow}>
              <Text style={styles.day}>Mon - Fri</Text>
              <Text style={styles.time}>09:00 AM - 06:00 PM</Text>
            </View>
            <View style={[styles.hourRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.day}>Saturday</Text>
              <Text style={styles.time}>10:00 AM - 02:00 PM</Text>
            </View>
          </View>
        </View>

        <PrimaryButton
          label="Save Changes"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 30 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingBottom: 40 },
  coverPhoto: {
    height: 160,
    backgroundColor: COLORS.primary,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 16,
  },
  editIcon: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 20,
  },

  form: {
    padding: 24,
    marginTop: -20,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 16,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },

  hoursCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  day: { fontWeight: "600", color: COLORS.text },
  time: { color: COLORS.primary, fontWeight: "700" },
});
