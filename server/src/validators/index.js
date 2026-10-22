import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Valid college email required').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  university: z.string().optional(),
  major: z.string().optional(),
  role: z.enum(['student', 'admin']).default('student')
});

export const loginSchema = z.object({
  email: z.string().email('Valid college email required'),
  password: z.string().min(1, 'Password is required')
});

export const onboardingSchema = z.object({
  commuteMode: z.string().min(1),
  goingDistanceKm: z.number().min(0).max(200),
  comingDistanceKm: z.number().min(0).max(200),
  commuteDaysPerWeek: z.number().int().min(1).max(7),
  housingType: z.string().min(1),
  electricityKwh: z.number().min(0).max(1000),
  dietType: z.string().min(1),
  clothingItemsPerMonth: z.number().min(0).max(50),
  thriftingPref: z.string().min(1),
  wasteBagsPerWeek: z.number().min(0).max(20),
  recyclesRegularly: z.boolean()
});

export const activitySchema = z.object({
  category: z.enum(['transport', 'energy', 'food', 'shopping', 'waste']),
  subtype: z.string().min(1),
  label: z.string().min(1).max(200),
  quantity: z.number().positive('Quantity must be greater than 0'),
  unit: z.string().min(1).max(30),
  activityDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').optional(),
  note: z.string().max(500).optional()
});

export const goalSchema = z.object({
  title: z.string().min(3).max(200),
  category: z.enum(['transport', 'energy', 'food', 'shopping', 'waste']),
  targetValue: z.number().positive(),
  unit: z.string().min(1).max(30),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Deadline must be YYYY-MM-DD'),
  co2SavingsKg: z.number().min(0).optional()
});
