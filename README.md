# Udhar — React Native First Release Demo

A complete dummy-data React Native/Expo prototype for a kirana/shop credit ledger app.

## First-release screen map

1. Welcome / Login
2. Dashboard
3. Customers list
4. Customer detail + ledger
5. Add customer
6. Add Udhar / credit transaction
7. Record payment
8. WhatsApp-style reminder composer
9. Reports
10. Notifications
11. Subscription / plans
12. Shop profile & settings

The demo uses local dummy data only. No API, database, authentication, payment gateway or WhatsApp API is connected yet.

## Run

```bash
npm install
npx expo start
```

Then scan the QR with Expo Go or use an emulator.

## Product assumptions in this prototype

- One shop owner account for the first release.
- Customer ledger supports credit and payment entries.
- Dashboard shows total outstanding, today's credit, today's collection and overdue amount.
- Customer search and status filters are included.
- Reports include monthly summary and customer balances.
- Reminder screen prepares a WhatsApp-style message; it does not actually send it.
- Subscription screen uses demo plans: Free, Pro ₹99/month, Business ₹299/month.
