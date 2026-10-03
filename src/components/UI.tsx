import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  TextStyle,
  Switch,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors, shadow } from '../theme/theme';
import { useLayout } from '../theme/layout';

export const tabScreenEdges: Edge[] = ['top', 'left', 'right'];
export const stackScreenEdges: Edge[] = ['top', 'left', 'right', 'bottom'];

export function Screen({
  children,
  style,
  edges = tabScreenEdges,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
}) {
  const { pad } = useLayout();
  return (
    <SafeAreaView style={[styles.screen, { paddingHorizontal: pad }, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

export function Header({ title, subtitle, onBack, right }: any) {
  const { titleSize, isSmall } = useLayout();
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.back} hitSlop={8}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sideSlot} />
      )}
      <View style={styles.headerCenter}>
        <Text style={[styles.title, { fontSize: titleSize }]} numberOfLines={isSmall ? 2 : 1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.sideSlot}>{right || null}</View>
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function HelpCard({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.help}>
      <Text style={styles.helpTitle}>{title}</Text>
      <Text style={styles.helpBody}>{body}</Text>
    </View>
  );
}

export function SwitchRow({
  title,
  body,
  value,
  onValueChange,
}: {
  title: string;
  body: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.switchRow}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={styles.switchTitle}>{title}</Text>
        <Text style={styles.helpBody}>{body}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
        thumbColor={value ? colors.primary : '#F8FAFC'}
      />
    </View>
  );
}

export function PrimaryButton({ title, onPress, icon, style }: any) {
  return (
    <TouchableOpacity style={[styles.primary, style]} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.primaryText} numberOfLines={1} adjustsFontSizeToFit>
        {icon ? `${icon}  ` : ''}
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function OutlineButton({ title, onPress, style }: any) {
  return (
    <TouchableOpacity style={[styles.outline, style]} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.outlineText} numberOfLines={1} adjustsFontSizeToFit>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function Field({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry,
  hint,
}: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

export function Pill({ text, tone = 'blue' }: any) {
  const map: Record<string, [string, string]> = {
    blue: [colors.primary, '#DBEAFE'],
    green: [colors.success, colors.successBg],
    red: [colors.danger, colors.dangerBg],
    orange: [colors.warning, colors.warningBg],
  };
  const [fg, bg] = map[tone] || map.blue;
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={{ color: fg, fontSize: 12, fontWeight: '700' }}>{text}</Text>
    </View>
  );
}

export function EmptySpace() {
  return <View style={{ height: 10 }} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16 },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 4,
  },
  sideSlot: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerCenter: { flex: 1, paddingHorizontal: 8 },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF0F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 28, color: colors.text, lineHeight: 30, marginTop: -2 },
  title: { fontSize: 20, fontWeight: '800', color: colors.text } as TextStyle,
  subtitle: { fontSize: 12, color: colors.muted, marginTop: 2, lineHeight: 16 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    ...shadow,
  },
  help: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  helpTitle: { fontWeight: '800', color: colors.primary, marginBottom: 4, fontSize: 13 },
  helpBody: { fontSize: 12, color: colors.muted, lineHeight: 18 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  switchTitle: { fontWeight: '800', color: colors.text, marginBottom: 4 },
  primary: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  outline: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  outlineText: { color: colors.primary, fontWeight: '800' },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 7 },
  input: {
    minHeight: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 15,
  },
  hint: { fontSize: 11, color: colors.muted, marginTop: 6, lineHeight: 16 },
  pill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, alignSelf: 'flex-start' },
});
