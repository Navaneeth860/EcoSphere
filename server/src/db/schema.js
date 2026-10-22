import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  numeric, 
  integer, 
  boolean, 
  date, 
  timestamp, 
  serial, 
  uniqueIndex, 
  index 
} from 'drizzle-orm/pg-core';

// 1. Users table (Student accounts & Campus Administrators)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).notNull().default('student'),
  university: varchar('university', { length: 150 }).notNull().default('B.M.S. College of Engineering (BMSCE), Basavanagudi, Bengaluru'),
  major: varchar('major', { length: 150 }).notNull().default('B.E. Computer Science & Engineering'),
  avatarUrl: text('avatar_url'),
  hasCompletedOnboarding: boolean('has_completed_onboarding').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  uniqueIndex('idx_users_email').on(table.email),
  index('idx_users_role').on(table.role)
]);

// 2. Official Indian Emission Factors (India GHG Program & CEA Karnataka Southern Grid)
export const emissionFactors = pgTable('emission_factors', {
  id: varchar('id', { length: 60 }).primaryKey(),
  category: varchar('category', { length: 30 }).notNull(),
  subtype: varchar('subtype', { length: 50 }).notNull(),
  factorValue: numeric('factor_value', { precision: 10, scale: 6 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  label: varchar('label', { length: 150 }).notNull(),
  source: varchar('source', { length: 200 }).notNull(),
  region: varchar('region', { length: 50 }).default('Karnataka / Southern Grid').notNull(),
  version: varchar('version', { length: 20 }).default('2024.1').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index('idx_emission_factors_cat_sub').on(table.category, table.subtype)
]);

// 3. Onboarding & Baseline Lifestyle Profile
export const onboardingResponses = pgTable('onboarding_responses', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  commuteMode: varchar('commute_mode', { length: 50 }).notNull().default('metro'),
  goingDistanceKm: numeric('going_distance_km', { precision: 6, scale: 2 }).notNull().default('7.50'),
  comingDistanceKm: numeric('coming_distance_km', { precision: 6, scale: 2 }).notNull().default('7.50'),
  commuteDaysPerWeek: integer('commute_days_per_week').notNull().default(5),
  housingType: varchar('housing_type', { length: 50 }).notNull().default('hostel_room'),
  electricityKwh: numeric('electricity_kwh', { precision: 6, scale: 2 }).notNull().default('55.00'),
  dietType: varchar('diet_type', { length: 50 }).notNull().default('pure_veg'),
  clothingItemsPerMonth: numeric('clothing_items_per_month', { precision: 4, scale: 1 }).notNull().default('1.0'),
  thriftingPref: varchar('thrifting_pref', { length: 50 }).notNull().default('occasional'),
  wasteBagsPerWeek: numeric('waste_bags_per_week', { precision: 4, scale: 1 }).notNull().default('1.5'),
  recyclesRegularly: boolean('recycles_regularly').notNull().default(true),
  baselineTransportKg: numeric('baseline_transport_kg', { precision: 8, scale: 2 }).notNull(),
  baselineEnergyKg: numeric('baseline_energy_kg', { precision: 8, scale: 2 }).notNull(),
  baselineFoodKg: numeric('baseline_food_kg', { precision: 8, scale: 2 }).notNull(),
  baselineShoppingKg: numeric('baseline_shopping_kg', { precision: 8, scale: 2 }).notNull(),
  baselineWasteKg: numeric('baseline_waste_kg', { precision: 8, scale: 2 }).notNull(),
  baselineTotalKg: numeric('baseline_total_kg', { precision: 8, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  uniqueIndex('idx_onboarding_user').on(table.userId)
]);

// 4. Student Logged Activities (Daily trips, canteen meals, power usage, raddi recycling)
export const activities = pgTable('activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  category: varchar('category', { length: 30 }).notNull(),
  subtype: varchar('subtype', { length: 50 }).notNull(),
  label: varchar('label', { length: 200 }).notNull(),
  quantity: numeric('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 30 }).notNull(),
  co2Kg: numeric('co2_kg', { precision: 10, scale: 3 }).notNull(),
  factorValueApplied: numeric('factor_value_applied', { precision: 10, scale: 6 }).notNull(),
  emissionFactorId: varchar('emission_factor_id', { length: 60 }).references(() => emissionFactors.id, { onDelete: 'set null' }),
  activityDate: date('activity_date').defaultNow().notNull(),
  note: text('note'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index('idx_activities_user_date').on(table.userId, table.activityDate),
  index('idx_activities_user_category').on(table.userId, table.category)
]);

// 5. Personal Sustainability Goals
export const goals = pgTable('goals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  category: varchar('category', { length: 30 }).notNull(),
  targetValue: numeric('target_value', { precision: 8, scale: 2 }).notNull(),
  currentValue: numeric('current_value', { precision: 8, scale: 2 }).notNull().default('0.00'),
  unit: varchar('unit', { length: 30 }).notNull(),
  deadline: date('deadline').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('in_progress'),
  co2SavingsKg: numeric('co2_savings_kg', { precision: 8, scale: 2 }).default('0.00'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index('idx_goals_user_status').on(table.userId, table.status)
]);

// 6. Campus Badges Definition
export const badges = pgTable('badges', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  icon: varchar('icon', { length: 50 }).notNull().default('Award'),
  category: varchar('category', { length: 30 }).notNull(),
  triggerRule: varchar('trigger_rule', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// 7. User Badges Join Table
export const userBadges = pgTable('user_badges', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  badgeId: varchar('badge_id', { length: 50 }).notNull().references(() => badges.id, { onDelete: 'cascade' }),
  awardedAt: timestamp('awarded_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index('idx_user_badges_user').on(table.userId)
]);

// 8. Demo activities table (preserves the live verification demo)
export const demoActivities = pgTable('demo_activities', {
  id: serial('id').primaryKey(),
  studentName: varchar('student_name', { length: 100 }).notNull().default('Chetan Rao (BMSCE)'),
  actionName: varchar('action_name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  co2Kg: numeric('co2_kg', { precision: 6, scale: 3 }).notNull(),
  sourceNote: varchar('source_note', { length: 150 }).default('India GHG Program (2015) / Namma Metro CDM'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

