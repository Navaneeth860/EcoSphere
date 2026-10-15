/**
 * Local Storage Seed & Data Service for EcoSphere (BMSCE Bengaluru, South Karnataka Context)
 */

export const INITIAL_USER = {
  id: 'usr_01',
  name: 'Chetan Rao',
  email: 'chetan.rao.cs23@bmsce.ac.in',
  role: 'student',
  major: 'B.E. Computer Science & Engineering (Batch of 2026)',
  university: 'B.M.S. College of Engineering (BMSCE), Bull Temple Road, Basavanagudi, Bengaluru',
  joinedDate: '2024-08-01',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  hasCompletedOnboarding: true
};

export const INITIAL_ONBOARDING_DATA = {
  commuteMode: 'metro',
  goingDistanceKm: 7.5, // e.g. Jayanagar / Banashankari to National College / BMSCE
  comingDistanceKm: 7.5,
  commuteDaysPerWeek: 5,
  housingType: 'hostel_room', // BMSCE Campus Hostel, Bull Temple Road
  electricityKwh: 55,
  dietType: 'pure_veg', // South Indian breakfast & mess lunch
  clothingItemsPerMonth: 1,
  thriftingPref: 'occasional',
  wasteBagsPerWeek: 1.5,
  recyclesRegularly: true // Local Gujri shop / BBMP dry waste sorting
};

export const INITIAL_ACTIVITIES = [
  {
    id: 'act_101',
    category: 'transport',
    subtype: 'metro',
    label: 'Namma Metro Green Line (Banashankari to National College / Basavanagudi)',
    quantity: 15,
    unit: 'km',
    co2Kg: 0.188,
    date: '2026-10-14',
    note: 'Round trip college commute to BMSCE via Namma Metro'
  },
  {
    id: 'act_102',
    category: 'food',
    subtype: 'pure_veg',
    label: 'BMSCE Canteen & Vidyarthi Bhavan Dosa + Filter Coffee',
    quantity: 1,
    unit: 'day',
    co2Kg: 1.7,
    date: '2026-10-14',
    note: 'South Indian vegetarian meals (Idli, Dosa, Sambar Rice)'
  },
  {
    id: 'act_103',
    category: 'transport',
    subtype: 'bus_city',
    label: 'BMTC Bus Route 210 / 215 (Jayanagar 4th Block to BMSCE Bull Temple)',
    quantity: 6,
    unit: 'km',
    co2Kg: 0.091,
    date: '2026-10-13',
    note: 'BMTC Student Bus Pass commute'
  },
  {
    id: 'act_104',
    category: 'transport',
    subtype: 'bicycle',
    label: 'Yulu Miracle Electric / Cycle ride across Gandhi Bazaar',
    quantity: 2.5,
    unit: 'km',
    co2Kg: 0.0,
    date: '2026-10-13',
    note: 'Active micro-mobility through Basavanagudi'
  },
  {
    id: 'act_105',
    category: 'energy',
    subtype: 'hostel_room',
    label: 'BMSCE International/General Hostel Monthly BESCOM Unit Share',
    quantity: 55,
    unit: 'kWh',
    co2Kg: 38.94,
    date: '2026-10-01',
    note: 'Study table LED, ceiling fan, and laptop charging (BESCOM grid)'
  },
  {
    id: 'act_106',
    category: 'shopping',
    subtype: 'books_photocopy',
    label: 'VTU Exam Question Banks & Xerox Notes from Gandhi Bazaar Xerox Shop',
    quantity: 2,
    unit: 'bundle',
    co2Kg: 2.0,
    date: '2026-10-11',
    note: 'Semester exam prep notes'
  },
  {
    id: 'act_107',
    category: 'waste',
    subtype: 'kabadiwala_recycled',
    label: 'Given Old Assignments & Newspapers to Local Basavanagudi Gujri Shop',
    quantity: 7,
    unit: 'kg',
    co2Kg: 0.35,
    date: '2026-10-10',
    note: 'Paper recycling scrap diversion'
  }
];

export const INITIAL_GOALS = [
  {
    id: 'goal_01',
    title: 'Commute to BMSCE exclusively via Namma Metro or BMTC 4 days/week',
    category: 'transport',
    targetValue: 16,
    currentValue: 13,
    unit: 'trips',
    deadline: '2026-10-31',
    status: 'in_progress',
    co2SavingsKg: 28.0
  },
  {
    id: 'goal_02',
    title: 'Pure South Indian Veg Meals in Hostel Mess (Avoid Zomato late-night)',
    category: 'food',
    targetValue: 6,
    currentValue: 5,
    unit: 'days',
    deadline: '2026-10-28',
    status: 'in_progress',
    co2SavingsKg: 14.5
  },
  {
    id: 'goal_03',
    title: 'Sort all BMSCE exam paper scrap to Gujri shop / BBMP Dry Waste Centre',
    category: 'waste',
    targetValue: 10,
    currentValue: 10,
    unit: 'kg',
    deadline: '2026-10-31',
    status: 'achieved',
    co2SavingsKg: 16.0
  }
];

export const INITIAL_BADGES = [
  { id: 'b1', name: 'Namma Metro Rider', desc: 'Logged 10 trips on Green/Purple Line', icon: 'Train', unlocked: true, date: '2026-10-10' },
  { id: 'b2', name: 'Gandhi Bazaar Pedestrian', desc: 'Walked or cycled across Basavanagudi', icon: 'Bike', unlocked: true, date: '2026-10-12' },
  { id: 'b3', name: 'Namma Gujri Hero', desc: 'Diverted campus raddi scrap to recycling', icon: 'Recycle', unlocked: true, date: '2026-10-12' },
  { id: 'b4', name: 'BMSCE Energy Saver', desc: 'Maintained low electricity usage in hostel', icon: 'Zap', unlocked: true },
  { id: 'b5', name: 'Hasiru Bengaluru Champion', desc: 'Maintained 30 days of active climate auditing', icon: 'Award', unlocked: false }
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
