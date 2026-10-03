import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Screen, Header, Card, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';

const data = [
  ['Payment received', 'Priya Sharma paid ₹1,200 via UPI.', 'Today, 9:15 AM'],
  ['Overdue reminder', 'Mahesh Babu has ₹5,680 outstanding.', 'Yesterday'],
  ['Weekly summary', 'You collected ₹43,800 in September.', '30 Sep'],
  ['New feature', 'WhatsApp reminder templates are ready.', '28 Sep'],
];

export default function Notifications({ navigation }: any) {
  return (
    <Screen edges={stackScreenEdges}>
      <Header title="Notifications" subtitle="Updates for your shop" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {data.map((x, i) => (
          <Card key={i} style={s.card}>
            <View style={s.dot} />
            <View style={{ flex: 1 }}>
              <Text style={s.title}>{x[0]}</Text>
              <Text style={s.body}>{x[1]}</Text>
              <Text style={s.time}>{x[2]}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  card: { flexDirection: 'row', marginBottom: 9 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary, marginTop: 6, marginRight: 12 },
  title: { fontWeight: '900', color: colors.text },
  body: { fontSize: 12, color: colors.muted, marginTop: 4, lineHeight: 18 },
  time: { fontSize: 10, color: '#94A3B8', marginTop: 5 },
});
