import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Screen, Header, Card, PrimaryButton, Pill, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';

const plans = [
  { name: 'Free', price: '₹0', desc: 'For trying Udhar', features: ['Up to 50 customers', 'Basic ledger', 'Monthly summary'] },
  {
    name: 'Pro',
    price: '₹99/mo',
    desc: 'For growing shops',
    features: ['Unlimited customers', 'WhatsApp reminders', 'Advanced reports', 'Backup-ready data'],
  },
  {
    name: 'Business',
    price: '₹299/mo',
    desc: 'For serious shop owners',
    features: ['Everything in Pro', 'Multiple staff users', 'Multiple shops', 'Priority support'],
  },
];

export default function Plans({ navigation }: any) {
  return (
    <Screen edges={stackScreenEdges}>
      <Header title="Plans" subtitle="Choose what fits your shop" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <Card style={s.current}>
          <Text style={s.muted}>Current plan</Text>
          <View style={s.currentRow}>
            <Text style={s.currentName}>Pro</Text>
            <Pill text="ACTIVE" tone="green" />
          </View>
          <Text style={s.muted}>Renewal: 03 Nov 2026</Text>
        </Card>
        {plans.map((p) => (
          <Card key={p.name} style={s.plan}>
            <Text style={s.planName}>{p.name}</Text>
            <Text style={s.price}>{p.price}</Text>
            <Text style={s.muted}>{p.desc}</Text>
            {p.features.map((f) => (
              <Text key={f} style={s.feature}>
                ✓ {f}
              </Text>
            ))}
            <PrimaryButton title={p.name === 'Pro' ? 'Current plan' : `Choose ${p.name}`} onPress={() => {}} />
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  current: { marginBottom: 12 },
  muted: { fontSize: 12, color: colors.muted },
  currentRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 6 },
  currentName: { fontSize: 23, fontWeight: '900', color: colors.text },
  plan: { marginBottom: 12 },
  planName: { fontSize: 20, fontWeight: '900', color: colors.text },
  price: { fontSize: 30, fontWeight: '900', color: colors.primary, marginVertical: 6 },
  feature: { fontSize: 13, color: '#334155', marginTop: 9 },
});
