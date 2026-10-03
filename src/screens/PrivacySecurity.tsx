import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import {
  Screen,
  Header,
  Card,
  Field,
  HelpCard,
  PrimaryButton,
  SwitchRow,
  stackScreenEdges,
} from '../components/UI';

export default function PrivacySecurity({ navigation }: any) {
  const [pin, setPin] = useState('1234');
  const [confirm, setConfirm] = useState('1234');
  const [lock, setLock] = useState(true);
  const [hideAmounts, setHideAmounts] = useState(false);

  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Privacy & security"
        subtitle="Protect the shop ledger on this phone"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <HelpCard
            title="Who can open Udhar?"
            body="Only the shop owner. There is no customer login. Use a PIN so staff or family cannot open the ledger if they pick up the phone."
          />
          <Card>
            <SwitchRow
              title="Ask PIN when opening app"
              body="Recommended. The demo PIN is 1234."
              value={lock}
              onValueChange={setLock}
            />
            <SwitchRow
              title="Hide amounts on Home"
              body="Shows **** instead of rupee totals until PIN is entered. Demo only."
              value={hideAmounts}
              onValueChange={setHideAmounts}
            />
          </Card>
          <Card style={{ marginTop: 12 }}>
            <Field
              label="New PIN"
              value={pin}
              onChangeText={setPin}
              keyboardType="number-pad"
              secureTextEntry
              hint="Use 4 digits. Do not share this PIN with customers."
            />
            <Field
              label="Confirm PIN"
              value={confirm}
              onChangeText={setConfirm}
              keyboardType="number-pad"
              secureTextEntry
            />
            <PrimaryButton
              title="Update PIN"
              onPress={() =>
                Alert.alert(
                  pin === confirm ? 'PIN updated (demo)' : 'PIN does not match',
                  pin === confirm
                    ? 'In the live app this PIN would replace 1234. This demo does not save it.'
                    : 'Enter the same 4 digits in both boxes.'
                )
              }
            />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const s = StyleSheet.create({ scroll: { paddingBottom: 24 } });
