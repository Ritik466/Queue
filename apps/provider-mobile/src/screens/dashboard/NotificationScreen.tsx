import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";

// Mock Data
const ALERTS = [
  {
    id: "1",
    title: "System Maintenance",
    body: "Server maintenance scheduled for 2:00 AM tonight.",
    type: "info",
    time: "1h ago",
  },
  {
    id: "2",
    title: "High Traffic",
    body: "Unusual number of walk-ins detected.",
    type: "alert",
    time: "3h ago",
  },
  {
    id: "3",
    title: "Great Job!",
    body: "You maintained a 5-star rating this week.",
    type: "success",
    time: "1d ago",
  },
];

export default function NotificationScreen({ navigation }: any) {
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={ALERTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={[
                styles.iconCircle,
                item.type === "alert"
                  ? styles.bgAlert
                  : item.type === "success"
                    ? styles.bgSuccess
                    : styles.bgInfo,
              ]}
            >
              <Ionicons
                name={
                  item.type === "alert"
                    ? "alert"
                    : item.type === "success"
                      ? "star"
                      : "information"
                }
                size={20}
                color={
                  item.type === "alert"
                    ? "#EF4444"
                    : item.type === "success"
                      ? "#F59E0B"
                      : "#3B82F6"
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFF",
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },

  card: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  bgAlert: { backgroundColor: "#FEF2F2" },
  bgSuccess: { backgroundColor: "#FFFBEB" },
  bgInfo: { backgroundColor: "#EFF6FF" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
  time: { fontSize: 12, color: "#94A3B8" },
  body: { fontSize: 13, color: "#64748B", lineHeight: 18 },
});
