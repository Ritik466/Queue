import Screen from "../../components/Screen";
import Card from "../../components/Card";
import ListItem from "../../components/ListItem";
import { Text, View, StyleSheet } from "react-native";
import { typography, colors } from "../../theme";

export default function ProfileScreen() {
  return (
    <Screen>
      <Card>
        <View style={styles.center}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>
          <Text style={typography.subheading}>Prathamraj</Text>
          <Text style={styles.role}>User</Text>
        </View>
      </Card>

      <Card>
        <ListItem label="Account settings" />
        <ListItem label="Get help" />
        <ListItem label="Data & privacy" />
      </Card>

      <Card>
        <ListItem label="Refer a friend" />
        <ListItem label="Refer a service" />
        <ListItem label="Legal" />
      </Card>

      <Card>
        <ListItem label="Log out" />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
  },
  role: {
    color: colors.textSecondary,
    marginTop: 4,
  },
});
