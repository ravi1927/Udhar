export type Customer = {
  id: string; name: string; phone: string; area: string; outstanding: number; lastActivity: string; status: 'Due' | 'Paid' | 'Overdue';
};
export type Entry = { id: string; customerId: string; type: 'credit' | 'payment'; amount: number; date: string; note: string };

export const shop = {
  name: 'Sri Lakshmi Kirana & General Store',
  owner: 'Ravi Chandra',
  phone: '98765 43210',
  plan: 'Pro',
  address: 'Plot 12, Film Nagar, Hyderabad',
  gstin: 'Not added yet',
};

export const customers: Customer[] = [
  { id:'c1', name:'Suresh Kumar', phone:'9876543210', area:'Shaikpet', outstanding:2450, lastActivity:'Today, 10:40 AM', status:'Due' },
  { id:'c2', name:'Anitha Reddy', phone:'9988776655', area:'Film Nagar', outstanding:1200, lastActivity:'Yesterday', status:'Due' },
  { id:'c3', name:'Mahesh Babu', phone:'9123456780', area:'Tolichowki', outstanding:5680, lastActivity:'3 days ago', status:'Overdue' },
  { id:'c4', name:'Priya Sharma', phone:'9000011112', area:'Manikonda', outstanding:0, lastActivity:'Today, 9:15 AM', status:'Paid' },
  { id:'c5', name:'Ramesh Naidu', phone:'9111122223', area:'Raidurgam', outstanding:890, lastActivity:'2 days ago', status:'Due' },
  { id:'c6', name:'Farhan Ahmed', phone:'9222233334', area:'Gachibowli', outstanding:3200, lastActivity:'5 days ago', status:'Overdue' }
];

export const entries: Entry[] = [
  { id:'e1', customerId:'c1', type:'credit', amount:1500, date:'Today, 10:40 AM', note:'Groceries and household items' },
  { id:'e2', customerId:'c1', type:'payment', amount:500, date:'Yesterday, 6:20 PM', note:'UPI payment' },
  { id:'e3', customerId:'c1', type:'credit', amount:1450, date:'28 Sep, 8:10 PM', note:'Monthly groceries' },
  { id:'e4', customerId:'c3', type:'credit', amount:3000, date:'28 Sep', note:'Groceries' },
  { id:'e5', customerId:'c3', type:'credit', amount:2680, date:'25 Sep', note:'Rice, oil and provisions' },
  { id:'e6', customerId:'c3', type:'payment', amount:0, date:'25 Sep', note:'No payment yet' }
];

export const monthly = [
  { month:'May', credit:32000, collection:24500 },
  { month:'Jun', credit:41000, collection:33800 },
  { month:'Jul', credit:38000, collection:31200 },
  { month:'Aug', credit:46500, collection:40100 },
  { month:'Sep', credit:52000, collection:43800 }
];
