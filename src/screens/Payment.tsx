import React, { useState } from 'react';
import { Alert, ScrollView, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Screen, Header, Card, Field, HelpCard, PrimaryButton, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';
import { customers } from '../data/dummy';

export default function Payment({ route, navigation }: any) {
  const customer = customers.find((x) => x.id === route?.params?.customerId) || customers[0];
  const [amount, setAmount] = useState('1000');
  const [method, setMethod] = useState('UPI');
  const [note, setNote] = useState('UPI payment');

  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Record payment"
        subtitle="When the customer pays, their outstanding goes down"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <HelpCard
            title="Cash, UPI, or bank"
            body="Udhar only notes that money was received. It does not collect UPI for you. Choose the method so your records stay clear."
          />
          <Card>
            <Text style={s.selected}>Paying customer • tap to change</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SelectCustomer', { next: 'Payment' })}>
              <Text style={s.name}>{customer.name}</Text>
              <Text style={s.muted}>Outstanding ₹{customer.outstanding.toLocaleString('en-IN')}</Text>
            </TouchableOpacity>
            <Field
              label="Payment amount (₹)"
              placeholder="₹0"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              hint="Cannot be more than outstanding in the live app. Demo allows any amount."
            />
            <Field
              label="Payment method"
              placeholder="Cash / UPI / Bank"
              value={method}
              onChangeText={setMethod}
              hint="Cash = notes in the till. UPI = PhonePe / GPay / bank app."
            />
            <Field label="Note" placeholder="Optional note" value={note} onChangeText={setNote} />
            <PrimaryButton
              title="Save payment"
              onPress={() => {
                Alert.alert('Payment saved (demo)', `₹${amount} from ${customer.name} via ${method} would reduce their balance.`);
                navigation.goBack();
              }}
            />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  selected: { fontSize: 12, color: colors.muted },
  name: { fontSize: 20, fontWeight: '900', color: colors.text, marginTop: 4 },
  muted: { color: colors.muted, marginBottom: 20, marginTop: 4 },
});
