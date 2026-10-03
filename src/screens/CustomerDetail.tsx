import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Screen, Header, Card, PrimaryButton, OutlineButton, Pill, HelpCard, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';
import { customers, entries } from '../data/dummy';

const money = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function CustomerDetail({ route, navigation }: any) {
  const c = customers.find((x) => x.id === route.params.customerId) || customers[0];
  const rows = entries.filter((e) => e.customerId === c.id);

  return (
    <Screen edges={stackScreenEdges}>
      <Header title={c.name} subtitle={`${c.phone} • ${c.area}`} onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <HelpCard
          title="This is one customer’s khata"
          body="Outstanding is what they still owe. Add Udhar when they take goods. Payment when they pay. Ledger is the history of both."
        />
        <Card style={s.balance}>
          <Text style={s.small}>Outstanding balance</Text>
          <Text style={s.big}>{money(c.outstanding)}</Text>
          <Pill
            text={c.status}
            tone={c.status === 'Overdue' ? 'red' : c.status === 'Paid' ? 'green' : 'orange'}
          />
        </Card>
        <View style={s.row}>
          <PrimaryButton
            style={s.flexBtn}
            title="＋ Add Udhar"
            onPress={() => navigation.navigate('AddEntry', { customerId: c.id })}
          />
          <View style={{ width: 8 }} />
          <OutlineButton
            style={s.flexBtn}
            title="₹ Payment"
            onPress={() => navigation.navigate('Payment', { customerId: c.id })}
          />
        </View>
        <Text style={s.section}>Ledger</Text>
        {rows.map((e) => (
          <Card key={e.id} style={s.entry}>
            <View style={[s.dot, { backgroundColor: e.type === 'credit' ? colors.danger : colors.success }]} />
            <View style={{ flex: 1 }}>
              <Text style={s.entryTitle}>{e.type === 'credit' ? 'Credit added' : 'Payment received'}</Text>
              <Text style={s.muted}>
                {e.note} • {e.date}
              </Text>
            </View>
            <Text style={{ fontWeight: '900', color: e.type === 'credit' ? colors.danger : colors.success }}>
              {e.type === 'credit' ? '+' : '-'}
              {money(e.amount)}
            </Text>
          </Card>
        ))}
        {!rows.length && <Text style={s.muted}>No ledger entries yet.</Text>}
        <Text style={s.section}>Customer actions</Text>
        <OutlineButton
          title="Send WhatsApp reminder"
          onPress={() => navigation.navigate('Reminders', { customerId: c.id })}
        />
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  balance: { alignItems: 'center', padding: 22 },
  small: { color: colors.muted },
  big: { fontSize: 36, fontWeight: '900', color: colors.text, marginVertical: 7 },
  row: { flexDirection: 'row', alignItems: 'stretch', marginTop: 4 },
  flexBtn: { flex: 1, marginTop: 8 },
  section: { fontSize: 17, fontWeight: '800', marginTop: 22, marginBottom: 10, color: colors.text },
  entry: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  entryTitle: { fontWeight: '800', color: colors.text },
  muted: { fontSize: 11, color: colors.muted, marginTop: 3 },
});
