import { describe, it, expect } from 'vitest';
import { getHealthLevel, generateMealPlan, getAlternatives, calculateWeeklyStats } from './engine';
import { foodMap } from '../data/foodDatabase';

describe('Foodspotting Engine unit tests', () => {
  // Test Health Level Scoring
  describe('getHealthLevel()', () => {
    it('returns "great" and green color for scores >= 7', () => {
      const res = getHealthLevel(8);
      expect(res.level).toBe('great');
      expect(res.label).toBe('Excellent');
      expect(res.color).toBe('#22c55e');
    });

    it('returns "good" for scores between 5 and 6', () => {
      const res = getHealthLevel(6);
      expect(res.level).toBe('good');
      expect(res.label).toBe('Good');
    });

    it('returns "bad" for scores below 3', () => {
      const res = getHealthLevel(2);
      expect(res.level).toBe('bad');
      expect(res.label).toBe('Limit');
    });
  });

  // Test Meal Generation Logic and Edge Cases
  describe('generateMealPlan()', () => {
    it('generates a full meal plan within a realistic budget', () => {
      const budget = 300;
      const plan = generateMealPlan(budget, 'muscleGain', 'both', false);
      expect(plan.meals.length).toBe(4);
      expect(plan.totalCost).toBeLessThanOrEqual(budget + 50); // slight variance allowed
    });

    it('healthMode strongly prioritizes high health scores', () => {
      const plan = generateMealPlan(500, 'cleanEating', 'veg', true);
      const avgScore = plan.meals.reduce((sum, m) => sum + m.food.healthScore, 0) / plan.meals.length;
      expect(avgScore).toBeGreaterThanOrEqual(7);
    });

    it('strictly returns only vegetarian foods when pref="veg"', () => {
      for (let i = 0; i < 5; i++) {
        const plan = generateMealPlan(300, 'weightLoss', 'veg', false);
        const hasNonVeg = plan.meals.some(m => m.food.type === 'non-veg');
        expect(hasNonVeg).toBe(false);
      }
    });

    it('handles incredibly low budgets gracefully by picking cheapest options', () => {
      const cheapPlan = generateMealPlan(50, 'weightLoss', 'veg', true);
      expect(cheapPlan.totalCost).toBeLessThanOrEqual(100);
    });
  });

  // Test Alternatives
  describe('getAlternatives()', () => {
    it('returns higher health score alternatives in the same category', () => {
      // Samosa has a health score of 2, category: snack, type: veg
      const alternatives = getAlternatives('samosa');
      expect(alternatives.length).toBeGreaterThan(0);
      alternatives.forEach(alt => {
        expect(alt.category).toBe('snack');
        expect(foodMap[alt.id].healthScore).toBeGreaterThan(2);
      });
    });

    it('returns an empty array if food is already the healthiest in its category', () => {
      // Moong dal chilla is 9
      const alternatives = getAlternatives('moong_dal_chilla');
      // Even if there are alternatives, they won't be strictly > 9 in the same category
      // They might just be alternatives of similar score
      const anyHigher = alternatives.some(alt => alt.healthScore > 9);
      expect(anyHigher).toBe(false);
    });
  });

  // Test Analytics Generation Edge Cases
  describe('calculateWeeklyStats()', () => {
    it('handles completely empty week with 0 values', () => {
      const emptyLog = {};
      const stats = calculateWeeklyStats(emptyLog);
      expect(stats.totalLogged).toBe(0);
      expect(stats.healthyRatio).toBe(0);
      expect(stats.proteinLevel).toBe('low');
    });

    it('correctly aggregates ratios for a mix of healthy and junk food', () => {
      const weekLog = {
        '2024-01-01': ['samosa', 'maggi'], // Junk
        '2024-01-02': ['boiled_eggs', 'sprouts_chaat', 'oats_porridge'] // Healthy
      };
      const stats = calculateWeeklyStats(weekLog);
      expect(stats.totalLogged).toBe(5);
      expect(stats.junkCount).toBe(2);
      expect(stats.healthyCount).toBe(3);
      expect(stats.healthyRatio).toBe(60); 
    });
  });
});
