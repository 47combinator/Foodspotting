/**
 * Meal Suggestion Engine
 * Generates realistic daily meal plans based on budget, goal, and preference.
 */

import { foods, foodMap, MEAL_SLOTS } from '../data/foodDatabase';

// Budget allocation per meal slot (proportional)
const BUDGET_WEIGHTS = { breakfast: 0.2, lunch: 0.35, snack: 0.15, dinner: 0.3 };

// Category mapping for meal slots
const SLOT_CATEGORIES = {
  breakfast: ['breakfast'],
  lunch:     ['lunch'],
  snack:     ['snack', 'street', 'beverage'],
  dinner:    ['dinner', 'lunch'],  // dinner can reuse lunch items
};

// Goal-based scoring weights
const GOAL_WEIGHTS = {
  weightLoss:  { healthScore: 3, lowCalorie: 3, protein: 1, notProcessed: 2 },
  muscleGain:  { healthScore: 1, lowCalorie: 0, protein: 4, notProcessed: 1 },
  cleanEating: { healthScore: 3, lowCalorie: 1, protein: 1, notProcessed: 4 },
};

/**
 * Score a food item for a given goal + health mode.
 * Higher = better fit.
 */
function scoreFoodForGoal(food, goal, healthMode) {
  const w = GOAL_WEIGHTS[goal] || GOAL_WEIGHTS.cleanEating;
  let score = 0;

  score += food.healthScore * w.healthScore;
  score += (food.caloriesApprox < 300 ? 2 : food.caloriesApprox < 400 ? 1 : 0) * w.lowCalorie;
  score += (food.protein === 'high' ? 3 : food.protein === 'medium' ? 1.5 : 0) * w.protein;
  score += (!food.processed ? 2 : 0) * w.notProcessed;

  // Bonus if food explicitly supports this goal
  if (food.goodFor.includes(goal)) score += 5;

  // Health mode: penalize processed, high sugar, low health score
  if (healthMode) {
    if (food.processed) score -= 8;
    if (food.sugar === 'high') score -= 6;
    if (food.healthScore < 5) score -= 4;
  }

  return score;
}

/**
 * Pick the best food for a meal slot within a budget.
 * Uses weighted random selection to add variety.
 */
function pickFoodForSlot(slot, budget, goal, preference, healthMode, usedIds) {
  const categories = SLOT_CATEGORIES[slot];

  let candidates = foods.filter((f) => {
    if (!categories.includes(f.category)) return false;
    if (preference !== 'both' && f.type !== preference) return false;
    if (f.priceRange[0] > budget) return false;
    if (usedIds.has(f.id)) return false;
    return true;
  });

  if (candidates.length === 0) {
    // Fallback: relax category constraint
    candidates = foods.filter((f) => {
      if (preference !== 'both' && f.type !== preference) return false;
      if (f.priceRange[0] > budget) return false;
      if (usedIds.has(f.id)) return false;
      return true;
    });
  }

  if (candidates.length === 0) return null;

  // Score and sort
  const scored = candidates.map((f) => ({
    food: f,
    score: scoreFoodForGoal(f, goal, healthMode),
  }));

  scored.sort((a, b) => b.score - a.score);

  // Weighted random from top 5 to add variety
  const top = scored.slice(0, Math.min(5, scored.length));
  const totalScore = top.reduce((s, t) => s + Math.max(t.score, 1), 0);
  let rand = Math.random() * totalScore;

  for (const t of top) {
    rand -= Math.max(t.score, 1);
    if (rand <= 0) return t.food;
  }

  return top[0].food;
}

/**
 * Generate a complete daily meal plan.
 * @param {number} budget - Total daily budget in ₹
 * @param {string} goal - 'weightLoss' | 'muscleGain' | 'cleanEating'
 * @param {string} preference - 'veg' | 'non-veg' | 'both'
 * @param {boolean} healthMode - Strict health-conscious mode
 * @returns {{ meals: Array<{slot, food, estimatedCost}>, totalCost: number }}
 */
export function generateMealPlan(budget, goal, preference, healthMode = false) {
  const usedIds = new Set();
  const meals = [];
  let totalCost = 0;

  for (const slot of MEAL_SLOTS) {
    const slotBudget = Math.round(budget * BUDGET_WEIGHTS[slot]);
    const food = pickFoodForSlot(slot, slotBudget, goal, preference, healthMode, usedIds);

    if (food) {
      usedIds.add(food.id);
      const estimatedCost = Math.round((food.priceRange[0] + food.priceRange[1]) / 2);
      totalCost += estimatedCost;
      meals.push({ slot, food, estimatedCost });
    }
  }

  return { meals, totalCost };
}

/**
 * Get healthier alternatives for a food item.
 * Returns alternatives sorted by health score descending.
 */
export function getAlternatives(foodId) {
  const food = foodMap[foodId];
  if (!food || !food.alternatives) return [];

  return food.alternatives
    .map((altId) => foodMap[altId])
    .filter(Boolean)
    .sort((a, b) => b.healthScore - a.healthScore);
}

/**
 * Score a food item's health level.
 * Returns { level, label, color }
 */
export function getHealthLevel(score) {
  if (score >= 8) return { level: 'great', label: 'Excellent', color: '#22c55e' };
  if (score >= 6) return { level: 'good',  label: 'Good',      color: '#4ade80' };
  if (score >= 4) return { level: 'okay',  label: 'Moderate',  color: '#f97316' };
  return                  { level: 'bad',   label: 'Limit',     color: '#ef4444' };
}

/**
 * Generate smart habit nudges based on the user's food log.
 */
export function generateNudges(todayLog, yesterdayLog) {
  const nudges = [];

  // Analyze today's log
  const todayFoods = (todayLog || []).map((id) => foodMap[id]).filter(Boolean);
  const yesterdayFoods = (yesterdayLog || []).map((id) => foodMap[id]).filter(Boolean);

  // Protein check
  const hasHighProtein = todayFoods.some((f) => f.protein === 'high');
  if (!hasHighProtein && todayFoods.length > 0) {
    nudges.push({
      type: 'protein',
      icon: '💪',
      text: '<strong>Try adding protein today.</strong> Consider eggs, sprouts, paneer tikka, or dal for your next meal.',
    });
  }

  // Sugar check from yesterday
  const highSugarYesterday = yesterdayFoods.filter((f) => f.sugar === 'high').length;
  if (highSugarYesterday >= 2) {
    nudges.push({
      type: 'sugar',
      icon: '⚠️',
      text: '<strong>Too much sugar yesterday.</strong> Try nimbu pani or chaas instead of sweet drinks today.',
    });
  }

  // Hydration reminder
  const hasBeverage = todayFoods.some((f) => f.category === 'beverage');
  if (!hasBeverage) {
    nudges.push({
      type: 'hydration',
      icon: '💧',
      text: '<strong>Hydration check!</strong> Have you had enough water? Try coconut water or nimbu pani.',
    });
  }

  // Healthy streak
  const allHealthy = todayFoods.length > 0 && todayFoods.every((f) => f.healthScore >= 6);
  if (allHealthy && todayFoods.length >= 2) {
    nudges.push({
      type: 'healthy',
      icon: '🌟',
      text: '<strong>Great choices today!</strong> Keep up the healthy streak. Every meal counts.',
    });
  }

  // Junk alert
  const junkCount = todayFoods.filter((f) => f.healthScore <= 3).length;
  if (junkCount >= 2) {
    nudges.push({
      type: 'sugar',
      icon: '🚨',
      text: '<strong>Multiple junk items today.</strong> Balance it out with a healthy dinner like dal rice or khichdi.',
    });
  }

  // Default nudges if none generated
  if (nudges.length === 0) {
    const hour = new Date().getHours();
    if (hour < 10) {
      nudges.push({
        type: 'healthy',
        icon: '🌅',
        text: '<strong>Good morning!</strong> Start your day with a protein-rich breakfast like eggs or moong dal chilla.',
      });
    } else if (hour < 15) {
      nudges.push({
        type: 'hydration',
        icon: '☀️',
        text: '<strong>Afternoon check-in!</strong> Stay hydrated and consider a light, balanced lunch.',
      });
    } else {
      nudges.push({
        type: 'healthy',
        icon: '🌙',
        text: '<strong>Evening tip!</strong> Keep dinner light with khichdi, curd rice, or roti sabzi.',
      });
    }
  }

  return nudges;
}

/**
 * Calculate weekly stats from the food log.
 * @param {Object} weekLog - { '2024-01-01': ['poha', 'dal_rice', ...], ... }
 * @returns {{ healthyRatio, proteinLevel, consistencyScore, totalLogged, healthyCount, junkCount }}
 */
export function calculateWeeklyStats(weekLog) {
  const allFoods = [];
  let daysLogged = 0;

  Object.values(weekLog).forEach((dayFoods) => {
    if (dayFoods && dayFoods.length > 0) {
      daysLogged++;
      dayFoods.forEach((id) => {
        const food = foodMap[id];
        if (food) allFoods.push(food);
      });
    }
  });

  if (allFoods.length === 0) {
    return {
      healthyRatio: 0,
      proteinLevel: 'low',
      consistencyScore: 0,
      totalLogged: 0,
      healthyCount: 0,
      junkCount: 0,
      daysLogged: 0,
    };
  }

  const healthyCount = allFoods.filter((f) => f.healthScore >= 6).length;
  const junkCount = allFoods.filter((f) => f.healthScore <= 3).length;
  const healthyRatio = Math.round((healthyCount / allFoods.length) * 100);

  const highProtein = allFoods.filter((f) => f.protein === 'high').length;
  const proteinRatio = highProtein / allFoods.length;
  const proteinLevel = proteinRatio >= 0.3 ? 'high' : proteinRatio >= 0.15 ? 'medium' : 'low';

  const consistencyScore = Math.round((daysLogged / 7) * 100);

  return {
    healthyRatio,
    proteinLevel,
    consistencyScore,
    totalLogged: allFoods.length,
    healthyCount,
    junkCount,
    daysLogged,
  };
}
