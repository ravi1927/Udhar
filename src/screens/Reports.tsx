import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Screen, Header, Card } from '../components/UI';
import { colors } from '../theme/theme';
import { monthly, customers } from '../data/dummy';

const money = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Reports() {
  const max = 52000;
  const top = [...customers].sort((a, b) => b.outstanding - a.outstanding).slice(0, 4);

  return (
    <Screen>
      <Header title="Reports" subtitle="Business performance overview" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.filters}>
          <Card style={s.filter}>
            <Text style={s.muted}>Period</Text>
            <Text style={s.value}>Last 5 months</Text>
          </Card>
          <Card style={s.filter}>
            <Text style={s.muted}>Type</Text>
            <Text style={s.value}>All activity</Text>
          </Card>
        </View>
        <View style={s.grid}>
          <Card style={s.kpi}>
            <Text style={s.muted}>Total credit</Text>
            <Text style={s.kpiValue}>{money(209500)}</Text>
          </Card>
          <Card style={s.kpi}>
            <Text style={s.muted}>Collected</Text>
            <Text style={[s.kpiValue, { color: colors.success }]}>{money(163400)}</Text>
          </Card>
        </View>
        <Text style={s.section}>Credit vs collection</Text>
        <Card>
          {monthly.map((m) => (
            <View key={m.month} style={s.barRow}>
              <Text style={s.month}>{m.month}</Text>
              <View style={s.track}>
                <View style={[s.bar, { width: `${(m.credit / max) * 100}%` }]} />
                <View style={[s.bar2, { width: `${(m.collection / max) * 100}%` }]} />
              </View>
              <Text style={s.small}>{money(m.credit)}</Text>
            </View>
          ))}
          <Text style={s.legend}>
            ■ Credit   <Text style={{ color: colors.success }}>■</Text> Collection
          </Text>
        </Card>
        <Text style={s.section}>Top outstanding customers</Text>
        {top.map((c) => (
          <Card key={c.id} style={s.customer}>
            <Text style={s.name}>{c.name}</Text>
            <Text style={s.muted}>{c.area}</Text>
            <Text style={s.out}>{money(c.outstanding)}</Text>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 20 },
  filters: { flexDirection: 'row', gap: 10 },
  filter: { flex: 1, padding: 12 },
  muted: { fontSize: 11, color: colors.muted },
  value: { fontWeight: '800', marginTop: 5, color: colors.text },
  grid: { flexDirection: 'row', gap: 10, marginTop: 10 },
  kpi: { flex: 1 },
  kpiValue: { fontSize: 18, fontWeight: '900', marginTop: 7, color: colors.text },
  section: { fontSize: 17, fontWeight: '800', marginTop: 22, marginBottom: 10, color: colors.text },
  barRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 7 },
  month: { width: 34, fontSize: 11, color: colors.muted },
  track: { flex: 1, height: 18, backgroundColor: '#F1F5F9', borderRadius: 8, overflow: 'hidden', padding: 2 },
  bar: { height: 6, backgroundColor: colors.primary, borderRadius: 8 },
  bar2: { height: 6, backgroundColor: colors.success, borderRadius: 8, marginTop: 2 },
  small: { width: 64, fontSize: 10, textAlign: 'right', color: colors.muted },
  legend: { fontSize: 11, color: colors.primary, marginTop: 10 },
  customer: { marginBottom: 8 },
  name: { fontWeight: '800', color: colors.text },
  out: { fontWeight: '900', fontSize: 17, color: colors.danger, marginTop: 5 },
});
