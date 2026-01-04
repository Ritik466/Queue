import Screen from "../../components/Screen";
import AppHeader from "../../components/AppHeader";
import Card from "../../components/Card";
import { Text } from "react-native";
import { typography, colors } from "../../theme";

export default function CreateScreen() {
  return (
    <Screen>
      <AppHeader title="Create" />

      <Card>
        <Text style={typography.subheading}>Create a custom queue</Text>
        <Text style={{ color: colors.textSecondary, marginTop: 6 }}>
          For clinics, events, or services
        </Text>
      </Card>

      <Card>
        <Text style={typography.subheading}>Register as service provider</Text>
        <Text style={{ color: colors.textSecondary, marginTop: 6 }}>
          Doctors, clinics, businesses
        </Text>
      </Card>
    </Screen>
  );
}
