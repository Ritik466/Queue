import Screen from "../../components/Screen";
import AppHeader from "../../components/AppHeader";
import Card from "../../components/Card";
import { Text, StyleSheet } from "react-native";
import { colors, typography } from "../../theme";

export default function QueueScreen() {
  return (
    <Screen>
      <AppHeader title="Your appointment" />

      <Card>
        <Text style={styles.hospital}>ABC Hospital</Text>
        <Text style={styles.time}>Today · 4:30 PM</Text>

        <Text style={styles.token}>Token #12</Text>
        <Text style={styles.link}>Add to calendar</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hospital: {
    ...typography.subheading,
  },
  time: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  token: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "600",
  },
  link: {
    marginTop: 8,
    color: "#2563EB",
  },
});
