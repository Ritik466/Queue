// src/components/CategoryPills.tsx
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { spacing, colors } from "../theme";
import { HospitalType } from "../services/mockData";

export type Category = "All" | HospitalType;

const CATEGORIES: Category[] = ["All", "Hospital", "Clinic", "Diagnostics"];

type Props = {
  active: Category;
  onChange: (c: Category) => void;
};

export default function CategoryPills({ active, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {CATEGORIES.map((c) => {
        const isActive = c === active;
        return (
          <View key={c} style={styles.pillWrap}>
            <TouchableOpacity
              onPress={() => onChange(c)}
              style={[styles.pill, isActive && styles.pillActive]}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.pillText, isActive && styles.pillTextActive]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
  },
  pillWrap: {
    marginRight: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.pillBg,
    borderWidth: 1,
    borderColor: "transparent",
  },
  pillActive: {
    backgroundColor: "#fff",
    borderColor: colors.textPrimary,
    borderWidth: 1,
  },
  pillText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  pillTextActive: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
});
