import React from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { Screen, Header, Card, HelpCard, PrimaryButton, OutlineButton, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';

export default function BackupData({ navigation }: any) {
  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Backup & data"
        subtitle="Keep a copy of customers and ledger entries"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={s.scroll}>
        <HelpCard
          title="Why backup?"
          body="Udhar stores your shop ledger on this phone. Backup copies customers, credit entries, and payments so you can restore them if the phone is lost or you change devices."
        />
        <Card>
          <Text style={s.label}>Last backup</Text>
          <Text style={s.value}>03 Oct 2026, 8:40 PM</Text>
          <Text style={s.muted}>Demo copy • 6 customers • 6 ledger entries</Text>
          <PrimaryButton
            title="Export backup file"
            onPress={() =>
              Alert.alert(
                'Export (demo)',
                'In the live app this creates a file you can save to Drive or share. No file is created in this demo.'
              )
            }
          />
          <OutlineButton
            title="Restore from file"
            onPress={() =>
              Alert.alert(
                'Restore (demo)',
                'Restore replaces the current shop data with an earlier backup. This demo does not change data.'
              )
            }
          />
        </Card>
        <Card style={{ marginTop: 12 }}>
          <Text style={s.label}>What gets backed up</Text>
          <Text style={s.item}>• Shop profile and owner details</Text>
          <Text style={s.item}>• Customer names, numbers, and balances</Text>
          <Text style={s.item}>• Credit and payment history</Text>
          <Text style={s.muted}>PIN and login are not exported.</Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  label: { fontSize: 12, color: colors.muted, fontWeight: '700' },
  value: { fontSize: 18, fontWeight: '900', color: colors.text, marginTop: 6 },
  muted: { fontSize: 12, color: colors.muted, marginTop: 8, lineHeight: 18 },
  item: { fontSize: 14, color: colors.text, marginTop: 8 },
});
