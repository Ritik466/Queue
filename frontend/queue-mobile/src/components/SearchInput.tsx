// src/components/SearchInput.tsx
import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, shadows } from "../theme";

type Props = TextInputProps & {
  value?: string;
  onChangeText?: (txt: string) => void;
};

export default function SearchInput(props: Props) {
  const { value, onChangeText, placeholder = "Search…" } = props;

  return (
    <View style={[styles.wrapper]}>
      <Ionicons
        name="search"
        size={20}
        color={colors.textMuted}
        style={styles.icon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    backgroundColor: colors.pillBg,
    borderRadius: 28,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    ...shadows.soft,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
