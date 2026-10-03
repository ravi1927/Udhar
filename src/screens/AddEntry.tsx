import React, { useState } from 'react';
import { Alert, ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Screen, Header, Card, Field, HelpCard, PrimaryButton, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';
import { customers } from '../data/dummy';

export default function AddEntry({ route, navigation }: any) {
  const customer = customers.find((x) => x.id === route?.params?.customerId) || customers[0];
  const [amount, setAmount] = useState('1500');
  const [note, setNote] = useState('Groceries and household items');
  const [type, setType] = useState('credit');

  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Add Udhar"
        subtitle="Udhar means the customer took goods now and will pay later"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <HelpCard
            title="What happens when you save?"
            body="Credit increases that customer’s outstanding. Payment decreases it. This demo does not keep the new amount after you leave the screen."
          />
          <Card>
            <Text style={s.label}>Entry type</Text>
            <View style={s.types}>
              <TouchableOpacity
                onPress={() => setType('credit')}
                style={[s.type, type === 'credit' && s.active]}
              >
                <Text style={{ color: type === 'credit' ? '#fff' : colors.text, fontWeight: '800', textAlign: 'center' }}>
                  Customer took goods
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType('payment')}
                style={[s.type, type === 'payment' && s.activeGreen]}
              >
                <Text style={{ color: type === 'payment' ? '#fff' : colors.text, fontWeight: '800' }}>Payment</Text>
              </TouchableOpacity>
            </View>
            <Field
              label="Amount (₹)"
              placeholder="₹0"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              hint={type === 'credit' ? 'Total value of goods taken today.' : 'Amount the customer paid now.'}
            />
            <Field
              label="Note"
              placeholder="What was purchased?"
              value={note}
              onChangeText={setNote}
              hint="Example: rice, oil, monthly kirana."
            />
            <Text style={s.label}>Customer</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectCustomer', { next: 'AddEntry' })}
              activeOpacity={0.85}
            >
              <Card style={s.customer}>
                <Text style={s.name}>{customer.name}</Text>
                <Text style={s.muted}>
                  Current balance ₹{customer.outstanding.toLocaleString('en-IN')} • Tap to change
                </Text>
              </Card>
            </TouchableOpacity>
            <PrimaryButton
              title="Save entry"
              onPress={() => {
                Alert.alert('Entry saved (demo)', `${type === 'credit' ? 'Credit' : 'Payment'} of ₹${amount} for ${customer.name} would update the ledger in the live app.`);
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
  label: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 8 },
  types: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  type: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#F1F5F9', alignItems: 'center' },
  active: { backgroundColor: colors.danger },
  activeGreen: { backgroundColor: colors.success },
  customer: { padding: 12, marginBottom: 5, elevation: 0, shadowOpacity: 0 },
  name: { fontWeight: '800', color: colors.text },
  muted: { color: colors.muted, fontSize: 12, marginTop: 4 },
});
