import { describe, it, expect } from 'vitest';
import { 
  calculateActivityEmission, 
  calculateBaselineAnnual, 
  getTreeEquivalents, 
  getStudentBenchmarkComparison 
} from '../src/services/carbonEngine.js';

describe('EcoSphere Indian Carbon Engine Calculations', () => {
  it('correctly calculates zero emissions for walking and biking', () => {
    expect(calculateActivityEmission('transport', 'walking', 10)).toBe(0);
    expect(calculateActivityEmission('transport', 'bicycle', 25)).toBe(0);
  });

  it('correctly calculates Metro rail transit emissions (0.0125 kg CO2/pax-km)', () => {
    // 20 km * 0.0125 = 0.25 kg CO2
    expect(calculateActivityEmission('transport', 'metro', 20)).toBe(0.25);
  });

  it('correctly calculates India GHG Program public bus emissions (0.015161)', () => {
    // 10 km * 0.015161 = 0.152 kg CO2
    expect(calculateActivityEmission('transport', 'bus_city', 10)).toBe(0.152);
  });

  it('correctly calculates India GHG Program 2-wheeler emissions (Activa <110cc = 0.0368)', () => {
    // 10 km * 0.0368 = 0.368 kg CO2
    expect(calculateActivityEmission('transport', 'scooter_petrol', 10)).toBe(0.368);
  });

  it('correctly calculates India GHG Program CNG auto emissions (0.10768)', () => {
    // 5 km * 0.10768 = 0.538 kg CO2
    expect(calculateActivityEmission('transport', 'auto_cng', 5)).toBe(0.538);
  });

  it('correctly calculates pure vegetarian thali food emissions (1.8 kg/day)', () => {
    expect(calculateActivityEmission('food', 'pure_veg', 1)).toBe(1.8);
  });

  it('correctly handles separate going and coming distances in baseline calculation', () => {
    const result = calculateBaselineAnnual({
      commuteMode: 'metro',
      goingDistanceKm: 10,
      comingDistanceKm: 12, // 22 km round trip
      housingType: 'hostel_room',
      electricityKwh: 65,
      dietType: 'pure_veg',
      clothingItemsPerMonth: 1,
      thriftingPref: 'occasional',
      wasteBagsPerWeek: 1.5,
      recyclesRegularly: true
    });

    // 22 km * 0.0125 * 180 days = 49.5 kg CO2
    expect(result.breakdown.transport).toBe(50);
    expect(result.total).toBeGreaterThan(1000);
  });

  it('computes native Indian tree equivalents (~21.0 kg/tree)', () => {
    expect(getTreeEquivalents(210)).toBe('10.0');
  });
});
