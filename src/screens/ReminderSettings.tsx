import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Screen, Header, Card, HelpCard, SwitchRow, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';

export default function ReminderSettings({ navigation }: any) {
  const [overdue, setOverdue] = useState(true);
  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(true);

  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Reminder preferences"
        subtitle="Choose which alerts this shop should see"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={s.scroll}>
        <HelpCard
          title="Reminders vs notifications"
          body="Reminders are WhatsApp-style messages you send to customers who still owe money. Notifications are alerts for you, the shop owner, inside this app."
        />
        <Card>
          <SwitchRow
            title="Overdue customer alerts"
            body="Notify me when a balance is unpaid for more than 3 days."
            value={overdue}
            onValueChange={setOverdue}
          />
          <SwitchRow
            title="Daily collection summary"
            body="A short note each evening with today’s credit and payments."
            value={daily}
            onValueChange={setDaily}
          />
          <SwitchRow
            title="Weekly business summary"
            body="Every Monday, show total credit vs collection for the week."
            value={weekly}
            onValueChange={setWeekly}
          />
        </Card>
        <Text style={s.note}>
          These switches are for review only. The live app will use them after login is connected.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  note: { fontSize: 12, color: colors.muted, marginTop: 14, lineHeight: 18, textAlign: 'center' },
});
