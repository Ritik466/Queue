// src/components/HorizontalHospitalList.tsx
import React from "react";
import { FlatList, StyleSheet, ViewStyle } from "react-native";
import HospitalCard from "./HospitalCard";
import type { Hospital } from "../services/mockData";
import { spacing } from "../theme";

type Props = {
  data: Hospital[];
  style?: ViewStyle;
  onPressItem?: (item: Hospital) => void;
};

export default function HorizontalHospitalList({
  data,
  style,
  onPressItem,
}: Props) {
  const ITEM_WIDTH = Math.round(
    require("react-native").Dimensions.get("window").width * 0.72,
  );
  const SPACING = spacing.md;

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(i) => i.id.toString()}
      contentContainerStyle={[styles.container, style]}
      snapToInterval={ITEM_WIDTH + SPACING}
      decelerationRate="fast"
      renderItem={({ item }) => (
        <HospitalCard hospital={item} onPress={() => onPressItem?.(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
});
