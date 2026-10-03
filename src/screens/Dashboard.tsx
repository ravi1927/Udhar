import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen, Header, Card, PrimaryButton, HelpCard } from '../components/UI';
import { colors } from '../theme/theme';
import { useLayout } from '../theme/layout';

const money = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Dashboard({ navigation }: any) {
  const { colWidth, gap, moneySize } = useLayout();

  return (
    <Screen>
      <Header
        title="Good morning, Ravi"
        subtitle="Sri Lakshmi Kirana — your shop ledger"
        right={
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} hitSlop={8}>
            <Text style={s.bell}>♢</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <HelpCard
          title="Udhar in one line"
          body="This home screen shows how much customers still owe you. Use Add Udhar when someone takes goods on credit, and Record payment when they pay."
        />
        <Card style={s.hero}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={s.heroLabel}>Total still unpaid</Text>
            <Text style={[s.heroMoney, { fontSize: moneySize }]}>{money(13420)}</Text>
            <Text style={s.heroSub}>Money customers owe this shop • 6 people • 2 overdue</Text>
          </View>
          <View style={s.walletWrap}>
            <Text style={s.wallet}>₹</Text>
          </View>
        </Card>
        <View style={[s.grid, { gap }]}>
          <Stat width={colWidth} title="Today's credit" value={money(3250)} hint="Goods given today" tone="blue" />
          <Stat width={colWidth} title="Today's collection" value={money(1800)} hint="Money received today" tone="green" />
          <Stat width={colWidth} title="Overdue" value={money(8880)} hint="Unpaid too long" tone="red" />
          <Stat width={colWidth} title="Customers" value="6" hint="People in your ledger" tone="purple" />
        </View>
        <Text style={s.section}>Do this next</Text>
        <View style={[s.actions, { gap }]}>
          <Action
            width={colWidth}
            icon="＋"
            title="Add Udhar"
            hint="Customer took goods"
            onPress={() => navigation.navigate('SelectCustomer', { next: 'AddEntry' })}
          />
          <Action
            width={colWidth}
            icon="₹"
            title="Record payment"
            hint="Customer paid money"
            onPress={() => navigation.navigate('SelectCustomer', { next: 'Payment' })}
          />
          <Action
            width={colWidth}
            icon="↗"
            title="Send reminders"
            hint="Ask for pending dues"
            onPress={() => navigation.navigate('Reminders')}
          />
          <Action
            width={colWidth}
            icon="+"
            title="Add customer"
            hint="New person in ledger"
            onPress={() => navigation.navigate('AddCustomer')}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('HowItWorks')} style={s.guide}>
          <Text style={s.guideTitle}>New to Udhar? See how it works</Text>
          <Text style={s.guideBody}>5 short steps: customer → credit → payment → reminder → reports</Text>
        </TouchableOpacity>
        <Text style={s.section}>Recent activity</Text>
        <Card>
          <Activity name="Suresh Kumar" text="Credit added" amount="+₹1,500" tone="red" time="10:40 AM" />
          <Activity name="Priya Sharma" text="Payment received" amount="₹1,200" tone="green" time="9:15 AM" />
          <Activity name="Ramesh Naidu" text="Credit added" amount="+₹890" tone="red" time="Yesterday" last />
        </Card>
        <PrimaryButton title="View all customers" onPress={() => navigation.navigate('Customers')} />
      </ScrollView>
    </Screen>
  );
}

function Stat({ title, value, hint, tone, width }: any) {
  const bg =
    tone === 'green'
      ? colors.successBg
      : tone === 'red'
        ? colors.dangerBg
        : tone === 'purple'
          ? colors.purpleBg
          : '#DBEAFE';
  return (
    <Card style={[s.stat, { backgroundColor: bg, width }]}>
      <Text style={s.statTitle}>{title}</Text>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statHint}>{hint}</Text>
    </Card>
  );
}

function Action({ icon, title, hint, onPress, width }: any) {
  return (
    <TouchableOpacity style={[s.action, { width }]} onPress={onPress} activeOpacity={0.85}>
      <View style={s.actionIcon}>
        <Text style={{ fontSize: 20, color: colors.primary }}>{icon}</Text>
      </View>
      <Text style={s.actionText}>{title}</Text>
      <Text style={s.actionHint}>{hint}</Text>
    </TouchableOpacity>
  );
}

function Activity({ name, text, amount, tone, time, last }: any) {
  return (
    <View style={[s.activity, last && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>{name[0]}</Text>
      </View>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.muted}>
          {text} • {time}
        </Text>
      </View>
      <Text style={{ fontWeight: '800', color: tone === 'green' ? colors.success : colors.danger }}>
        {amount}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 20 },
  hero: {
    backgroundColor: colors.primary,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderColor: colors.primary,
  },
  heroLabel: { color: '#DBEAFE', fontSize: 13 },
  heroMoney: { color: '#fff', fontSize: 32, fontWeight: '900', marginTop: 5 },
  heroSub: { color: '#DBEAFE', marginTop: 6, lineHeight: 18 },
  walletWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  wallet: { fontSize: 22, color: '#fff', fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  stat: { minHeight: 92, elevation: 0, shadowOpacity: 0 },
  statTitle: { fontSize: 12, color: colors.muted },
  statValue: { fontSize: 18, fontWeight: '900', color: colors.text, marginTop: 6 },
  statHint: { fontSize: 11, color: colors.muted, marginTop: 4 },
  section: { fontSize: 17, fontWeight: '800', marginTop: 22, marginBottom: 10, color: colors.text },
  actions: { flexDirection: 'row', flexWrap: 'wrap' },
  action: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { fontWeight: '800', fontSize: 13, marginTop: 7, color: colors.text, textAlign: 'center' },
  actionHint: { fontSize: 11, color: colors.muted, marginTop: 3, textAlign: 'center' },
  guide: {
    marginTop: 14,
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  guideTitle: { fontWeight: '800', color: colors.purple },
  guideBody: { fontSize: 12, color: colors.muted, marginTop: 4, lineHeight: 18 },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: colors.primary, fontWeight: '900' },
  name: { fontWeight: '800', color: colors.text },
  muted: { fontSize: 11, color: colors.muted, marginTop: 3 },
  bell: { fontSize: 22, color: colors.primary },
});
