import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { COLORS } from "../../theme";

const MOCK_HISTORY = [
  {
    id: "1",
    date: "Today, 10:15 AM",
    name: "Alice M.",
    type: "Check-up",
    fee: "$150",
  },
  {
    id: "2",
    date: "Today, 09:45 AM",
    name: "John D.",
    type: "Emergency",
    fee: "$200",
  },
  { id: "3", date: "Yesterday", name: "Sarah W.", type: "Report", fee: "$100" },
];

export default function HistoryScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Session History" showBack />

      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.iconBox}>
              <Ionicons
                name="checkmark-done"
                size={20}
                color={COLORS.success}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>
                {item.date} • {item.type}
              </Text>
            </View>
            <Text style={styles.fee}>{item.fee}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontWeight: "700", color: COLORS.text, fontSize: 15 },
  date: { color: COLORS.subText, fontSize: 12, marginTop: 2 },
  fee: { fontWeight: "700", color: COLORS.primary, fontSize: 15 },
});
