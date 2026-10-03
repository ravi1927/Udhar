import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen, Card, Field, PrimaryButton } from '../components/UI';
import { colors, shadow } from '../theme/theme';

export default function Login({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('9876543210');
  const [pin, setPin] = useState('1234');

  return (
    <Screen edges={['left', 'right']} style={styles.screen}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 16) + 20 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.hero, { paddingTop: Math.max(insets.top, 20) + 28 }]}>
            <View style={styles.blobOne} />
            <View style={styles.blobTwo} />
            <View style={styles.logo}>
              <Text style={styles.logoText}>U</Text>
            </View>
            <Text style={styles.brand}>Udhar</Text>
            <Text style={styles.tag}>A digital bahi-khata for one shop owner</Text>
            <View style={styles.chips}>
              <Text style={styles.chip}>Credit ledger</Text>
              <Text style={styles.chip}>Payments</Text>
              <Text style={styles.chip}>Reminders</Text>
            </View>
          </View>

          <Card style={styles.card}>
            <Text style={styles.h}>Shop owner login</Text>
            <Text style={styles.p}>
              Customers do not log in. Only you, the shop owner, open Udhar to record credit and collections.
              This demo is pre-filled — tap Continue.
            </Text>
            <Field
              label="Shop mobile number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="10 digit mobile"
              hint="In the live app this number receives OTP. Here it is a demo number."
            />
            <Field
              label="4-digit PIN"
              value={pin}
              onChangeText={setPin}
              keyboardType="number-pad"
              placeholder="4 digit PIN"
              secureTextEntry
              hint="Keeps the ledger private on this phone. Demo PIN is 1234."
            />
            <PrimaryButton title="Continue to shop" onPress={() => navigation.replace('Tabs')} />
            <Text style={styles.demo}>Demo data • No real account or payment is created</Text>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, backgroundColor: colors.bg },
  wrap: { flexGrow: 1, backgroundColor: colors.bg },
  hero: {
    backgroundColor: colors.primary,
    paddingBottom: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  blobOne: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#3B82F6',
    top: -40,
    right: -50,
    opacity: 0.45,
  },
  blobTwo: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1D4ED8',
    bottom: 20,
    left: -30,
    opacity: 0.4,
  },
  logo: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  logoText: { fontSize: 40, fontWeight: '900', color: colors.primary },
  brand: { fontSize: 38, fontWeight: '900', color: '#fff', marginTop: 14 },
  tag: { textAlign: 'center', color: '#DBEAFE', marginTop: 6, fontSize: 15 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 18 },
  chip: {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    marginHorizontal: 16,
    marginTop: -28,
    padding: 20,
  },
  h: { fontSize: 22, fontWeight: '800', color: colors.text },
  p: { color: colors.muted, marginTop: 6, marginBottom: 18, lineHeight: 20 },
  demo: { textAlign: 'center', fontSize: 12, color: colors.muted, marginTop: 14 },
});
