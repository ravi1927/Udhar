import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen, Header, Card, HelpCard, Pill, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';
import { customers } from '../data/dummy';

const money = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function SelectCustomer({ route, navigation }: any) {
  const next = route?.params?.next || 'AddEntry';

  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Choose customer"
        subtitle={next === 'Payment' ? 'Who is paying now?' : 'Who took goods on credit?'}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={s.scroll}>
        <HelpCard
          title="Select one person"
          body="Tap a customer to open the next form with their name and current balance already filled."
        />
        {customers.map((c) => (
          <TouchableOpacity
            key={c.id}
            activeOpacity={0.85}
            onPress={() => navigation.replace(next, { customerId: c.id })}
          >
            <Card style={s.row}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{c.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{c.name}</Text>
                <Text style={s.meta}>
                  {c.phone} • {c.area}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.amount}>{money(c.outstanding)}</Text>
                <Pill
                  text={c.status}
                  tone={c.status === 'Overdue' ? 'red' : c.status === 'Paid' ? 'green' : 'orange'}
                />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: colors.primary, fontWeight: '900' },
  name: { fontWeight: '800', color: colors.text },
  meta: { fontSize: 11, color: colors.muted, marginTop: 3 },
  amount: { fontWeight: '900', color: colors.text, marginBottom: 6 },
});
