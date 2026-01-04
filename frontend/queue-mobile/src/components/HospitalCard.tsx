// src/components/HospitalCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors, spacing, typography, shadows } from "../theme";
import type { Hospital } from "../services/mockData";

const SCREEN = Dimensions.get("window");
const CARD_WIDTH = Math.round(SCREEN.width * 0.72);

type Props = {
  hospital: Hospital;
  onPress?: () => void;
};

export default function HospitalCard({ hospital, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.root}
    >
      <View style={styles.imagePlaceholder}>
        {/* You can replace this with <Image source={{uri: hospital.image}} style={styles.image} /> */}
      </View>

      <View style={styles.meta}>
        <Text numberOfLines={1} style={styles.name}>
          {hospital.name}
        </Text>

        <Text numberOfLines={1} style={styles.location}>
          {hospital.location}
        </Text>

        {hospital.status ? (
          <Text
            style={[
              styles.status,
              hospital.status === "limited"
                ? styles.statusLimited
                : styles.statusAvailable,
            ]}
          >
            {hospital.status === "limited"
              ? "Limited slots"
              : "Available today"}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginRight: spacing.md,
    padding: spacing.md,
    // outer card shadow
    ...shadows.card,
  },

  imagePlaceholder: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#E7E9EC",
    marginBottom: spacing.sm,
  },

  meta: {
    paddingHorizontal: 2,
  },

  name: {
    ...typography.subheading,
    color: colors.textPrimary,
    marginBottom: 6,
  },

  location: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  status: {
    marginTop: 8,
    fontWeight: "600",
  },

  statusAvailable: {
    color: colors.success,
  },

  statusLimited: {
    color: colors.warning,
  },
});
