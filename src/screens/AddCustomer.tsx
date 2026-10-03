import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Screen, Header, Card, Field, PrimaryButton, stackScreenEdges } from '../components/UI';
import { colors } from '../theme/theme';

export default function AddCustomer({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [opening, setOpening] = useState('');

  return (
    <Screen edges={stackScreenEdges}>
      <Header title="Add customer" subtitle="Save a customer and start their ledger" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <Card>
            <Field label="Customer name" placeholder="e.g. Ramesh Kumar" value={name} onChangeText={setName} />
            <Field
              label="Mobile number"
              placeholder="10 digit mobile"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Field label="Area / locality" placeholder="e.g. Shaikpet" value={area} onChangeText={setArea} />
            <Field
              label="Opening balance (optional)"
              placeholder="₹0"
              value={opening}
              onChangeText={setOpening}
              keyboardType="numeric"
            />
            <PrimaryButton title="Save customer" onPress={() => navigation.goBack()} />
          </Card>
          <Text style={s.note}>You can add credit and payments after saving.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  note: { color: colors.muted, textAlign: 'center', marginTop: 15, fontSize: 12 },
});
