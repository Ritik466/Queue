import { View, Text, FlatList, StyleSheet } from "react-native";
import HospitalCard from "./HospitalCard";
import { Hospital } from "../services/mockData";
import { spacing, colors } from "../theme";

export default function HospitalSection({
  title,
  data,
}: {
  title: string;
  data: Hospital[];
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HospitalCard hospital={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});