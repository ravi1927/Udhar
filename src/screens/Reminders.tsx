import React from 'react';
import { Alert, ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Screen, Header, Card, HelpCard, PrimaryButton, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';
import { customers } from '../data/dummy';

const money = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Reminders({ navigation }: any) {
  const due = customers.filter((c) => c.outstanding > 0);

  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Payment reminders"
        subtitle="Prepare friendly WhatsApp reminders"
        onBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <HelpCard
          title="This does not send WhatsApp yet"
          body="Each card is a customer who still owes money. WhatsApp would open a polite message with the exact rupee amount. In this demo the button only shows the message."
        />
        {due.map((c) => (
          <Card key={c.id} style={s.item}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={s.name}>{c.name}</Text>
              <Text style={s.muted}>
                {c.phone} • {c.area}
              </Text>
              <Text style={s.amount}>{money(c.outstanding)} due</Text>
            </View>
            <TouchableOpacity
              style={s.send}
              activeOpacity={0.85}
              onPress={() =>
                Alert.alert(
                  'Reminder (demo)',
                  `Namaste ${c.name}, this is ${'Sri Lakshmi Kirana'}. Your pending udhar is ${money(c.outstanding)}. Please pay when you can. Thank you.`
                )
              }
            >
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 12 }}>WhatsApp</Text>
            </TouchableOpacity>
          </Card>
        ))}
        <PrimaryButton
          title="Preview all reminders (demo)"
          onPress={() =>
            Alert.alert('Send all (demo)', `${due.length} reminder messages would be prepared. Nothing is sent from this prototype.`)
          }
        />
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  info: { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', elevation: 0, shadowOpacity: 0 },
  infoTitle: { fontWeight: '900', color: colors.primary, marginBottom: 5 },
  muted: { fontSize: 12, color: colors.muted, lineHeight: 18 },
  item: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  name: { fontWeight: '900', fontSize: 15, color: colors.text },
  amount: { fontWeight: '900', color: colors.danger, marginTop: 7 },
  send: { backgroundColor: '#16A34A', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
});
