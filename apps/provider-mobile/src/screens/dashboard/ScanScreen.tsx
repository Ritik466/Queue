import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../../theme";
import Header from "../../components/Header";

const { width } = Dimensions.get("window");

export default function ScanScreen({ navigation }: any) {
  const [scanning, setScanning] = useState(true);

  // Simulate a scan after 3 seconds (For testing flow without Camera crashes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
      // In real app: Navigate to patient details or auto-check-in
      alert("Patient #45 Verified Successfully!");
      navigation.goBack();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Scan Token" showBack />

      <View style={styles.cameraBox}>
        <View style={styles.mask}>
          <Text style={styles.instructions}>
            Align QR code within the frame
          </Text>
        </View>

        {/* The "Finder" Box */}
        <View style={styles.finder}>
          <View
            style={[
              styles.corner,
              { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
            ]}
          />
          <View
            style={[
              styles.corner,
              { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
            ]}
          />
          <View
            style={[
              styles.corner,
              { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
            ]}
          />
          <View
            style={[
              styles.corner,
              {
                bottom: 0,
                right: 0,
                borderBottomWidth: 4,
                borderRightWidth: 4,
              },
            ]}
          />

          {/* The Laser Animation */}
          {scanning && (
            <Animatable.View
              animation="fadeInDown"
              iterationCount="infinite"
              duration={1500}
              easing="linear"
              style={styles.laser}
            />
          )}
        </View>

        <TouchableOpacity style={styles.torchBtn}>
          <Ionicons name="flashlight" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.manualBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.manualText}>Enter Code Manually</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  cameraBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  mask: { position: "absolute", top: 100, alignItems: "center" },
  instructions: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    fontWeight: "600",
  },

  finder: { width: width * 0.7, height: width * 0.7, position: "relative" },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: COLORS.primary,
  },

  laser: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.danger,
    opacity: 0.8,
  },

  torchBtn: {
    marginTop: 60,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: { padding: 40, alignItems: "center" },
  manualBtn: { paddingVertical: 12, paddingHorizontal: 24 },
  manualText: { color: COLORS.primary, fontSize: 16, fontWeight: "700" },
});
