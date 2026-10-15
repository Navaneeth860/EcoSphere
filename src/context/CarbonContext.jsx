import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  INITIAL_ACTIVITIES, 
  INITIAL_ONBOARDING_DATA, 
  INITIAL_GOALS, 
  INITIAL_BADGES, 
  getStoredData, 
  setStoredData 
} from '../services/storageService';
import { 
  calculateActivityEmission, 
  calculateBaselineAnnual,
  getStudentBenchmarkComparison 
} from '../services/carbonEngine';

const CarbonContext = createContext(null);

export function CarbonProvider({ children }) {
  const [activities, setActivities] = useState(() => getStoredData('activities', INITIAL_ACTIVITIES));
  const [onboardingData, setOnboardingData] = useState(() => getStoredData('onboarding', INITIAL_ONBOARDING_DATA));
  const [goals, setGoals] = useState(() => getStoredData('goals', INITIAL_GOALS));
  const [badges, setBadges] = useState(() => getStoredData('badges', INITIAL_BADGES));

  useEffect(() => {
    setStoredData('activities', activities);
  }, [activities]);

  useEffect(() => {
    setStoredData('onboarding', onboardingData);
  }, [onboardingData]);

  useEffect(() => {
    setStoredData('goals', goals);
  }, [goals]);

  useEffect(() => {
    setStoredData('badges', badges);
  }, [badges]);

  // Baseline calculation from onboarding
  const baseline = useMemo(() => {
    return calculateBaselineAnnual(onboardingData);
  }, [onboardingData]);

  // Aggregated activity footprint totals
  const activityEmissionsByCategory = useMemo(() => {
    const totals = { transport: 0, energy: 0, food: 0, shopping: 0, waste: 0 };
    activities.forEach(act => {
      if (totals[act.category] !== undefined) {
        totals[act.category] += Number(act.co2Kg || 0);
      }
    });
    return {
      transport: parseFloat(totals.transport.toFixed(1)),
      energy: parseFloat(totals.energy.toFixed(1)),
      food: parseFloat(totals.food.toFixed(1)),
      shopping: parseFloat(totals.shopping.toFixed(1)),
      waste: parseFloat(totals.waste.toFixed(1)),
      total: parseFloat((totals.transport + totals.energy + totals.food + totals.shopping + totals.waste).toFixed(1))
    };
  }, [activities]);

  // Benchmark stats
  const benchmark = useMemo(() => {
    return getStudentBenchmarkComparison(baseline.total);
  }, [baseline.total]);

  // CRUD for activities
  const addActivity = (actData) => {
    const co2Kg = calculateActivityEmission(actData.category, actData.subtype, actData.quantity);
    const newActivity = {
      id: `act_${Date.now()}`,
      category: actData.category,
      subtype: actData.subtype,
      label: actData.label || `${actData.category} entry`,
      quantity: parseFloat(actData.quantity),
      unit: actData.unit,
      co2Kg,
      date: actData.date || new Date().toISOString().split('T')[0],
      note: actData.note || ''
    };
    setActivities(prev => [newActivity, ...prev]);
    return newActivity;
  };

  const updateActivity = (id, updatedData) => {
    setActivities(prev => prev.map(item => {
      if (item.id === id) {
        const category = updatedData.category || item.category;
        const subtype = updatedData.subtype || item.subtype;
        const quantity = parseFloat(updatedData.quantity !== undefined ? updatedData.quantity : item.quantity);
        const co2Kg = calculateActivityEmission(category, subtype, quantity);
        return {
          ...item,
          ...updatedData,
          co2Kg
        };
      }
      return item;
    }));
  };

  const deleteActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  // Add / Toggle Goals
  const addGoal = (newGoal) => {
    const goal = {
      id: `goal_${Date.now()}`,
      status: 'in_progress',
      currentValue: 0,
      ...newGoal
    };
    setGoals(prev => [goal, ...prev]);
  };

  const updateGoalProgress = (id, increment = 1) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextVal = Math.min(g.targetValue, g.currentValue + increment);
        const status = nextVal >= g.targetValue ? 'achieved' : 'in_progress';
        return { ...g, currentValue: nextVal, status };
      }
      return g;
    }));
  };

  return (
    <CarbonContext.Provider value={{
      activities,
      onboardingData,
      setOnboardingData,
      goals,
      badges,
      baseline,
      activityEmissionsByCategory,
      benchmark,
      addActivity,
      updateActivity,
      deleteActivity,
      addGoal,
      updateGoalProgress
    }}>
      {children}
    </CarbonContext.Provider>
  );
}

export function useCarbon() {
  return useContext(CarbonContext);
}
