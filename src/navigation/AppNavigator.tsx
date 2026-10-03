import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Customers from '../screens/Customers';
import CustomerDetail from '../screens/CustomerDetail';
import AddCustomer from '../screens/AddCustomer';
import AddEntry from '../screens/AddEntry';
import Payment from '../screens/Payment';
import Reminders from '../screens/Reminders';
import Reports from '../screens/Reports';
import Notifications from '../screens/Notifications';
import Plans from '../screens/Plans';
import Settings from '../screens/Settings';
import ShopProfile from '../screens/ShopProfile';
import BackupData from '../screens/BackupData';
import PrivacySecurity from '../screens/PrivacySecurity';
import ReminderSettings from '../screens/ReminderSettings';
import HowItWorks from '../screens/HowItWorks';
import SelectCustomer from '../screens/SelectCustomer';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const icons: Record<string, string> = {
  Home: '⌂',
  Customers: '☺',
  Reports: '▤',
  Settings: '⚙',
};

function TabIcon({ route, focused, color }: { route: string; focused: boolean; color: string }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Text style={[styles.icon, { color }]}>{icons[route] || '•'}</Text>
    </View>
  );
}

function Tabs() {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: 2 },
        tabBarItemStyle: { paddingTop: 4 },
        tabBarStyle: {
          height: 52 + bottom,
          paddingTop: 4,
          paddingBottom: bottom,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 12,
        },
        tabBarIcon: ({ focused, color }) => (
          <TabIcon route={route.name} focused={focused} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Customers" component={Customers} options={{ tabBarLabel: 'Customers' }} />
      <Tab.Screen name="Reports" component={Reports} options={{ tabBarLabel: 'Reports' }} />
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="SelectCustomer" component={SelectCustomer} />
        <Stack.Screen name="AddEntry" component={AddEntry} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Reminders" component={Reminders} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Plans" component={Plans} />
        <Stack.Screen name="ShopProfile" component={ShopProfile} />
        <Stack.Screen name="BackupData" component={BackupData} />
        <Stack.Screen name="PrivacySecurity" component={PrivacySecurity} />
        <Stack.Screen name="ReminderSettings" component={ReminderSettings} />
        <Stack.Screen name="HowItWorks" component={HowItWorks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: { backgroundColor: '#EFF6FF' },
  icon: { fontSize: 16, fontWeight: '700' },
});
