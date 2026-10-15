/**
 * Local Storage Seed & Data Service for GreenTrack
 */

export const INITIAL_USER = {
  id: 'usr_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@campus.edu',
  role: 'student',
  major: 'Environmental Engineering & Data Science',
  university: 'Greenfield State University',
  joinedDate: '2024-09-01',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  hasCompletedOnboarding: true
};

export const INITIAL_ONBOARDING_DATA = {
  commuteMode: 'bus',
  commuteDistanceKm: 6.5,
  housingType: 'dorm_room',
  electricityKwh: 120,
  dietType: 'flexitarian',
  clothingItemsPerMonth: 2,
  thriftingPref: 'occasional',
  wasteBagsPerWeek: 2,
  recyclesRegularly: true
};

export const INITIAL_ACTIVITIES = [
  {
    id: 'act_101',
    category: 'transport',
    subtype: 'bus',
    label: 'Campus Express Bus Ride',
    quantity: 13,
    unit: 'km',
    co2Kg: 1.157,
    date: '2026-10-14',
    note: 'Round trip from off-campus library'
  },
  {
    id: 'act_102',
    category: 'food',
    subtype: 'vegetarian',
    label: 'Meatless Campus Cafeteria Lunch',
    quantity: 1,
    unit: 'day',
    co2Kg: 2.5,
    date: '2026-10-14',
    note: 'Tofu quinoa bowl and apple'
  },
  {
    id: 'act_103',
    category: 'transport',
    subtype: 'bicycle',
    label: 'Biked to Engineering Lab',
    quantity: 4,
    unit: 'km',
    co2Kg: 0.0,
    date: '2026-10-13',
    note: 'Zero emission trip!'
  },
  {
    id: 'act_104',
    category: 'shopping',
    subtype: 'clothing_thrift',
    label: 'Thrifted Winter Jacket',
    quantity: 1,
    unit: 'item',
    co2Kg: 1.2,
    date: '2026-10-12',
    note: 'Bought at university charity thrift fair'
  },
  {
    id: 'act_105',
    category: 'energy',
    subtype: 'dorm_room',
    label: 'Monthly Dorm Electricity Allotment',
    quantity: 110,
    unit: 'kWh',
    co2Kg: 42.35,
    date: '2026-10-01',
    note: 'October utility apportionment'
  },
  {
    id: 'act_106',
    category: 'food',
    subtype: 'vegan',
    label: 'Full Plant-Based Sunday',
    quantity: 1,
    unit: 'day',
    co2Kg: 1.5,
    date: '2026-10-08',
    note: 'Oatmeal, lentil soup, stir fry'
  },
  {
    id: 'act_107',
    category: 'waste',
    subtype: 'recycled_kg',
    label: 'Paper & Can Recycling Drop-off',
    quantity: 5,
    unit: 'kg',
    co2Kg: 0.4,
    date: '2026-10-10',
    note: 'Emptied recycling station'
  }
];

export const INITIAL_GOALS = [
  {
    id: 'goal_01',
    title: 'Commute by Bike or Walk 3x a Week',
    category: 'transport',
    targetValue: 12,
    currentValue: 8,
    unit: 'trips',
    deadline: '2026-10-31',
    status: 'in_progress',
    co2SavingsKg: 18.5
  },
  {
    id: 'goal_02',
    title: 'Plant-Based Lunches (Meatless Mondays)',
    category: 'food',
    targetValue: 4,
    currentValue: 3,
    unit: 'meals',
    deadline: '2026-10-28',
    status: 'in_progress',
    co2SavingsKg: 14.1
  },
  {
    id: 'goal_03',
    title: 'Zero New Fast-Fashion Purchases This Month',
    category: 'shopping',
    targetValue: 1,
    currentValue: 1,
    unit: 'month',
    deadline: '2026-10-31',
    status: 'achieved',
    co2SavingsKg: 30.0
  }
];

export const INITIAL_BADGES = [
  { id: 'b1', name: 'Pedal Pioneer', desc: 'Logged 5 bicycle commutes', icon: 'Bike', unlocked: true, date: '2026-10-10' },
  { id: 'b2', name: 'Leaf Eater', desc: 'Chose plant-based meals 5 times', icon: 'Salad', unlocked: true, date: '2026-10-12' },
  { id: 'b3', name: 'Thrift Master', desc: 'Opted for secondhand items', icon: 'ShoppingBag', unlocked: true, date: '2026-10-12' },
  { id: 'b4', name: 'Energy Squeezer', desc: 'Kept monthly electricity under 100 kWh', icon: 'Zap', unlocked: false },
  { id: 'b5', name: 'Eco Ambassador', desc: 'Maintained 30 days of footprint tracking', icon: 'Award', unlocked: false }
];

export function getStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(`greentrack_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function setStoredData(key, value) {
  try {
    localStorage.setItem(`greentrack_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error', e);
  }
}
