import Screen from "../../components/Screen";
import EmptyState from "../../components/EmptyState";

export default function MessagesScreen() {
  return (
    <Screen>
      <EmptyState
        title="No messages yet"
        description="Updates and reminders will appear here."
      />
    </Screen>
  );
}
