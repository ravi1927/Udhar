import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Screen, Header, Card, Pill, HelpCard } from '../components/UI';
import { colors } from '../theme/theme';
import { shop } from '../data/dummy';

const rows = [
  {
    icon: '?',
    title: 'How Udhar works',
    body: 'Learn credit, payment, reminders, and reports in 5 steps.',
    screen: 'HowItWorks',
  },
  {
    icon: '🏪',
    title: 'Shop profile',
    body: 'Shop name, owner, mobile, and address used on this ledger.',
    screen: 'ShopProfile',
  },
  {
    icon: '💳',
    title: 'Subscription',
    body: 'Free, Pro, and Business plans. You are on Pro in this demo.',
    screen: 'Plans',
  },
  {
    icon: '🔔',
    title: 'Reminder preferences',
    body: 'Choose overdue alerts and daily/weekly summaries for the owner.',
    screen: 'ReminderSettings',
  },
  {
    icon: '☁',
    title: 'Backup & data',
    body: 'Export or restore customers and ledger entries.',
    screen: 'BackupData',
  },
  {
    icon: '🔒',
    title: 'Privacy & security',
    body: 'PIN lock and hide amounts so only the owner can open the app.',
    screen: 'PrivacySecurity',
  },
];

export default function Settings({ navigation }: any) {
  return (
    <Screen>
      <Header title="Settings" subtitle="Shop, plans, backup, and security" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <HelpCard
          title="This tab is for the shop owner"
          body="Customers never see Settings. Change shop details, backup data, and PIN here. Tap any row to open that screen."
        />
        <Card style={s.profile}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>SL</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{shop.name}</Text>
            <Text style={s.muted}>
              {shop.owner} • {shop.phone}
            </Text>
            <View style={{ marginTop: 6 }}>
              <Pill text={`${shop.plan} plan`} tone="blue" />
            </View>
          </View>
        </Card>
        {rows.map((row) => (
          <TouchableOpacity key={row.title} activeOpacity={0.85} onPress={() => navigation.navigate(row.screen)}>
            <Card style={s.row}>
              <Text style={s.icon}>{row.icon}</Text>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={s.rowTitle}>{row.title}</Text>
                <Text style={s.muted}>{row.body}</Text>
              </View>
              <Text style={s.arrow}>›</Text>
            </Card>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.logout} onPress={() => navigation.replace('Login')} activeOpacity={0.85}>
          <Text style={{ color: colors.danger, fontWeight: '800' }}>Log out</Text>
        </TouchableOpacity>
        <Text style={s.logoutHint}>Returns to the demo login. No account is deleted.</Text>
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 20 },
  profile: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  name: { fontWeight: '900', fontSize: 15, color: colors.text },
  muted: { fontSize: 12, color: colors.muted, marginTop: 3, lineHeight: 17 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 22, width: 40, textAlign: 'center' },
  rowTitle: { fontWeight: '800', color: colors.text },
  arrow: { fontSize: 25, color: '#94A3B8' },
  logout: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dangerBg,
    borderRadius: 12,
    marginTop: 12,
  },
  logoutHint: { textAlign: 'center', fontSize: 11, color: colors.muted, marginTop: 8 },
});
