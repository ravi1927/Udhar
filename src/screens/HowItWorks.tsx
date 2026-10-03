import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen, Header, Card, HelpCard, PrimaryButton, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';

const steps = [
  {
    n: '1',
    title: 'Add a customer',
    body: 'Save name, mobile, and area. Each customer gets their own ledger. They do not install the app.',
  },
  {
    n: '2',
    title: 'Add Udhar (credit)',
    body: 'When a customer takes goods now and will pay later, add the amount to their ledger. Outstanding goes up.',
  },
  {
    n: '3',
    title: 'Record payment',
    body: 'When they pay by cash or UPI, record it. Outstanding goes down. Paid customers show a green Paid tag.',
  },
  {
    n: '4',
    title: 'Send a reminder',
    body: 'Open Reminders to copy a polite WhatsApp-style message with the exact balance. This demo does not send it.',
  },
  {
    n: '5',
    title: 'Check Reports',
    body: 'See monthly credit vs collection and who still owes the most, so you know the shop’s cash position.',
  },
];

export default function HowItWorks({ navigation }: any) {
  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="How Udhar works"
        subtitle="A credit notebook for one shop owner"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={s.scroll}>
        <HelpCard
          title="What Udhar is"
          body="Udhar is a simple bahi-khata for kirana and small shops. You track who took goods on credit and who paid. There is no customer app and no payment gateway in this first release."
        />
        {steps.map((step) => (
          <Card key={step.n} style={s.step}>
            <View style={s.badge}>
              <Text style={s.badgeText}>{step.n}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.title}>{step.title}</Text>
              <Text style={s.body}>{step.body}</Text>
            </View>
          </Card>
        ))}
        <PrimaryButton title="Add first customer" onPress={() => navigation.navigate('AddCustomer')} />
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  step: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  badgeText: { color: '#fff', fontWeight: '900' },
  title: { fontWeight: '800', color: colors.text, marginBottom: 4 },
  body: { fontSize: 13, color: colors.muted, lineHeight: 19 },
});
