import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Screen, Header, Card, Pill, HelpCard } from '../components/UI';
import { colors } from '../theme/theme';
import { customers } from '../data/dummy';

const money = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Customers({ navigation }: any) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');
  const list = useMemo(
    () =>
      customers.filter(
        (c) =>
          (filter === 'All' || c.status === filter) &&
          `${c.name} ${c.phone}`.toLowerCase().includes(q.toLowerCase())
      ),
    [q, filter]
  );

  return (
    <Screen>
      <Header
        title="Customers"
        subtitle="People who buy from your shop on credit"
        right={
          <TouchableOpacity onPress={() => navigation.navigate('AddCustomer')} hitSlop={8}>
            <Text style={s.add}>＋</Text>
          </TouchableOpacity>
        }
      />
      <HelpCard
        title="How to read this list"
        body="Due = still owes money. Overdue = unpaid for too long. Paid = balance is zero. Tap a name to open their ledger. + adds a new customer."
      />
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search name or mobile"
        placeholderTextColor="#94A3B8"
        style={s.search}
      />
      <View style={s.filters}>
        {['All', 'Due', 'Overdue', 'Paid'].map((x) => (
          <TouchableOpacity
            key={x}
            onPress={() => setFilter(x)}
            style={[s.filter, filter === x && s.active]}
          >
            <Text style={{ color: filter === x ? '#fff' : colors.muted, fontWeight: '700', fontSize: 13 }}>
              {x}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {list.map((c) => (
          <TouchableOpacity
            key={c.id}
            onPress={() => navigation.navigate('CustomerDetail', { customerId: c.id })}
            activeOpacity={0.85}
          >
            <Card style={s.customer}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{c.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{c.name}</Text>
                <Text style={s.meta}>
                  {c.phone} • {c.area}
                </Text>
                <Text style={s.meta}>{c.lastActivity}</Text>
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
        {!list.length && <Text style={s.empty}>No customers found.</Text>}
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  search: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    color: colors.text,
  },
  filters: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  filter: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff' },
  active: { backgroundColor: colors.primary },
  scroll: { paddingBottom: 20 },
  customer: { flexDirection: 'row', alignItems: 'center', marginBottom: 9, padding: 13 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  avatarText: { color: colors.primary, fontSize: 18, fontWeight: '900' },
  name: { fontWeight: '800', fontSize: 15, color: colors.text },
  meta: { fontSize: 11, color: colors.muted, marginTop: 3 },
  amount: { fontSize: 16, fontWeight: '900', color: colors.text, marginBottom: 6 },
  add: { fontSize: 26, color: colors.primary, fontWeight: '700' },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 50 },
});
