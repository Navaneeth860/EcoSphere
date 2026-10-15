import { describe, it, expect } from 'vitest';
import { 
  calculateActivityEmission, 
  calculateBaselineAnnual, 
  getTreeEquivalents, 
  getStudentBenchmarkComparison 
} from '../src/services/carbonEngine.js';

describe('Carbon Engine Calculations', () => {
  it('correctly calculates zero emissions for walking and biking', () => {
    expect(calculateActivityEmission('transport', 'walking', 10)).toBe(0);
    expect(calculateActivityEmission('transport', 'bicycle', 25)).toBe(0);
  });

  it('correctly calculates bus transit emissions with DEFRA factor (0.089)', () => {
    // 10 km * 0.089 = 0.89 kg CO2e
    expect(calculateActivityEmission('transport', 'bus', 10)).toBe(0.89);
  });

  it('correctly calculates personal solo car emissions (0.192)', () => {
    // 50 km * 0.192 = 9.6 kg CO2e
    expect(calculateActivityEmission('transport', 'car_gasoline', 50)).toBe(9.6);
  });

  it('correctly calculates food emissions for vegan and vegetarian diets', () => {
    // 1 day vegan * 1.5 = 1.5
    expect(calculateActivityEmission('food', 'vegan', 1)).toBe(1.5);
    // 1 day vegetarian * 2.5 = 2.5
    expect(calculateActivityEmission('food', 'vegetarian', 1)).toBe(2.5);
  });

  it('correctly computes tree equivalents (approx 21.77 kg/tree)', () => {
    // 217.7 kg CO2 => 10.0 trees
    expect(getTreeEquivalents(217.7)).toBe('10.0');
  });

  it('correctly compares student footprint with college average (3200 kg)', () => {
    const comparison = getStudentBenchmarkComparison(2800);
    expect(comparison.isLower).toBe(true);
    expect(comparison.percentDiff).toBe(13); // |2800-3200| / 3200 = 12.5% => 13%
  });

  it('calculates baseline annual calculation reproducibly', () => {
    const result = calculateBaselineAnnual({
      commuteMode: 'bus',
      commuteDistanceKm: 6.5,
      housingType: 'dorm_room',
      electricityKwh: 120,
      dietType: 'flexitarian',
      clothingItemsPerMonth: 2,
      thriftingPref: 'occasional',
      wasteBagsPerWeek: 2,
      recyclesRegularly: true
    });
    expect(result.total).toBeGreaterThan(1500);
    expect(result.breakdown.transport).toBeGreaterThan(0);
    expect(result.breakdown.energy).toBeGreaterThan(0);
    expect(result.breakdown.food).toBeGreaterThan(0);
  });
});
