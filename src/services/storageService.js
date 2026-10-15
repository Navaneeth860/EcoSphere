/**
 * Local Storage Seed & Data Service for EcoSphere (Indian University Context)
 */

export const INITIAL_USER = {
  id: 'usr_01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@iitd.ac.in',
  role: 'student',
  major: 'B.Tech in Computer Science & Environmental Systems',
  university: 'Indian Institute of Technology (IIT Delhi)',
  joinedDate: '2024-08-01',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  hasCompletedOnboarding: true
};

export const INITIAL_ONBOARDING_DATA = {
  commuteMode: 'metro',
  goingDistanceKm: 8.5,
  comingDistanceKm: 8.5,
  commuteDaysPerWeek: 5,
  housingType: 'hostel_room',
  electricityKwh: 65,
  dietType: 'pure_veg',
  clothingItemsPerMonth: 1,
  thriftingPref: 'occasional',
  wasteBagsPerWeek: 1.5,
  recyclesRegularly: true // Kabadiwala / hostel recycling bin
};

export const INITIAL_ACTIVITIES = [
  {
    id: 'act_101',
    category: 'transport',
    subtype: 'metro',
    label: 'Delhi Metro Yellow Line (Hauz Khas to Vishwavidyalaya)',
    quantity: 17,
    unit: 'km',
    co2Kg: 0.213,
    date: '2026-10-14',
    note: 'Round trip college commute via Metro Rail'
  },
  {
    id: 'act_102',
    category: 'food',
    subtype: 'pure_veg',
    label: 'Campus Hostel Mess Lunch (Roti, Dal Tadka, Rice & Sabzi)',
    quantity: 1,
    unit: 'day',
    co2Kg: 1.8,
    date: '2026-10-14',
    note: 'Pure vegetarian mess meal'
  },
  {
    id: 'act_103',
    category: 'transport',
    subtype: 'auto_cng',
    label: 'Auto Rickshaw (CNG) from Metro Station to Campus Gate',
    quantity: 3.5,
    unit: 'km',
    co2Kg: 0.377,
    date: '2026-10-13',
    note: 'Shared CNG auto ride'
  },
  {
    id: 'act_104',
    category: 'transport',
    subtype: 'bicycle',
    label: 'Cycled inside campus to Central Library',
    quantity: 3,
    unit: 'km',
    co2Kg: 0.0,
    date: '2026-10-13',
    note: 'Campus green cycle sharing'
  },
  {
    id: 'act_105',
    category: 'shopping',
    subtype: 'thrift_clothes',
    label: 'Thrifted Kurta / Denim from Street Fair',
    quantity: 1,
    unit: 'item',
    co2Kg: 0.9,
    date: '2026-10-12',
    note: 'Second-hand student flea market'
  },
  {
    id: 'act_106',
    category: 'energy',
    subtype: 'hostel_room',
    label: 'Hostel Room Monthly Electricity Share',
    quantity: 60,
    unit: 'kWh',
    co2Kg: 43.2,
    date: '2026-10-01',
    note: 'Fan, LED study lamp, and laptop charging (CEA 0.720 factor)'
  },
  {
    id: 'act_107',
    category: 'waste',
    subtype: 'kabadiwala_recycled',
    label: 'Semester Raddi & Plastic bottles given to Kabadiwala',
    quantity: 8,
    unit: 'kg',
    co2Kg: 0.48,
    date: '2026-10-10',
    note: 'Responsible paper and can recycling'
  }
];

export const INITIAL_GOALS = [
  {
    id: 'goal_01',
    title: 'Commute by Metro or Bus 4 days a week',
    category: 'transport',
    targetValue: 16,
    currentValue: 12,
    unit: 'trips',
    deadline: '2026-10-31',
    status: 'in_progress',
    co2SavingsKg: 24.5
  },
  {
    id: 'goal_02',
    title: 'Pure Desi Veg Mess Meals (Avoid Fast Food Burgers)',
    category: 'food',
    targetValue: 6,
    currentValue: 5,
    unit: 'days',
    deadline: '2026-10-28',
    status: 'in_progress',
    co2SavingsKg: 12.0
  },
  {
    id: 'goal_03',
    title: 'Give all semester exam waste & paper to Kabadiwala',
    category: 'waste',
    targetValue: 10,
    currentValue: 10,
    unit: 'kg',
    deadline: '2026-10-31',
    status: 'achieved',
    co2SavingsKg: 18.0
  }
];

export const INITIAL_BADGES = [
  { id: 'b1', name: 'Metro Commuter', desc: 'Used Metro / Train for 10 trips', icon: 'Train', unlocked: true, date: '2026-10-10' },
  { id: 'b2', name: 'Desi Green Eater', desc: 'Chose nutritious Indian vegetarian thali', icon: 'Salad', unlocked: true, date: '2026-10-12' },
  { id: 'b3', name: 'Raddi Recycler', desc: 'Sorted recyclables to the Kabadiwala', icon: 'Recycle', unlocked: true, date: '2026-10-12' },
  { id: 'b4', name: 'Hostel Power Saver', desc: 'Turned off hostel switches before leaving', icon: 'Zap', unlocked: true },
  { id: 'b5', name: 'Campus Eco Hero', desc: 'Maintained 30 days of footprint tracking', icon: 'Award', unlocked: false }
];

export function getStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(`ecosphere_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function setStoredData(key, value) {
  try {
    localStorage.setItem(`ecosphere_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error', e);
  }
}
