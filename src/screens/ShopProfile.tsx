import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Screen, Header, Card, Field, HelpCard, PrimaryButton, stackScreenEdges } from '../components/UI';
import { shop } from '../data/dummy';

export default function ShopProfile({ navigation }: any) {
  const [name, setName] = useState(shop.name);
  const [owner, setOwner] = useState(shop.owner);
  const [phone, setPhone] = useState(shop.phone);
  const [address, setAddress] = useState(shop.address);
  const [gstin, setGstin] = useState(shop.gstin);

  return (
    <Screen edges={stackScreenEdges}>
      <Header
        title="Shop profile"
        subtitle="This name appears on the home screen and on reminder messages"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <HelpCard
            title="What is this?"
            body="Shop profile is your business identity in Udhar. Customers never log in. Only the shop owner uses this app, so keep the mobile number and owner name correct."
          />
          <Card>
            <Field
              label="Shop name"
              value={name}
              onChangeText={setName}
              hint="Shown on Home, Settings, and WhatsApp reminder text."
            />
            <Field label="Owner name" value={owner} onChangeText={setOwner} hint="The person who manages this ledger." />
            <Field
              label="Shop mobile"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              hint="Used as the login number in this demo."
            />
            <Field label="Address / locality" value={address} onChangeText={setAddress} />
            <Field
              label="GSTIN (optional)"
              value={gstin}
              onChangeText={setGstin}
              hint="Not required for the first release. Add later if you need it on reports."
            />
            <PrimaryButton
              title="Save shop profile"
              onPress={() => Alert.alert('Saved (demo)', 'Shop profile is stored only on this phone in the real app. This demo does not keep changes after you leave.')}
            />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const s = StyleSheet.create({ scroll: { paddingBottom: 24 } });
