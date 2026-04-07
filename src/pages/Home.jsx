import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { GOALS, foodMap } from '../data/foodDatabase';
import { generateMealPlan, generateNudges, getHealthLevel } from '../utils/engine';
import { FoodDetailModal } from '../components/FoodCard';
import { getFoodImage } from '../data/foodImages';

/** Time-aware greeting generator */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { line1: 'Good', line2: 'Morning', accent: 'rise & eat well' };
  if (h < 17) return { line1: 'Good', line2: 'Afternoon', accent: 'fuel your day' };
  if (h < 21) return { line1: 'Good', line2: 'Evening', accent: 'eat light tonight' };
  return { line1: 'Good', line2: 'Night', accent: 'rest well' };
}

export default function Home() {
  const {
    healthMode, defaultBudget, setDefaultBudget,
    defaultGoal, setDefaultGoal, defaultPreference, setDefaultPreference,
    todayLog, getYesterdayLog,
  } = useApp();

  const [budget, setBudget] = useState(defaultBudget);
  const [goal, setGoal] = useState(defaultGoal);
  const [preference, setPreference] = useState(defaultPreference);
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  const greeting = getGreeting();
  const nudges = useMemo(() => generateNudges(todayLog, getYesterdayLog()), [todayLog]);

  const handleGenerate = useCallback(() => {
    const plan = generateMealPlan(budget, goal, preference, healthMode);
    setMealPlan(plan);
    setDefaultBudget(budget);
    setDefaultGoal(goal);
    setDefaultPreference(preference);
  }, [budget, goal, preference, healthMode]);

  const handleRegenerate = useCallback(() => {
    setMealPlan(generateMealPlan(budget, goal, preference, healthMode));
  }, [budget, goal, preference, healthMode]);

  const dateString = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="anim-fade">
      {/* ── Greeting ── */}
      <div className="greeting">
        <div className="greeting__eyebrow">{dateString}</div>
        <h1 className="greeting__headline">
          {greeting.line1}{' '}
          <span className="greeting__accent">{greeting.line2}.</span>
        </h1>
        {healthMode && (
          <div className="greeting__health-tag">🌿 Health Mode Active</div>
        )}
      </div>

      {/* ── Nudges ── */}
      {nudges.length > 0 && (
        <div className="section">
          <div className="section__header">
            <span className="section__title">💡 Daily Tips</span>
          </div>
          <div className="nudge-scroll">
            {nudges.map((nudge, i) => (
              <div key={i} className={`nudge-card nudge-card--${nudge.type}`}>
                <span className="nudge-card__icon">{nudge.icon}</span>
                <span
                  className="nudge-card__text"
                  dangerouslySetInnerHTML={{ __html: nudge.text }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Today's Log ── */}
      {todayLog.length > 0 && (
        <div className="section">
          <div className="section__header">
            <span className="section__title">📋 Logged Today · {todayLog.length}</span>
          </div>
          <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
            {todayLog.map((id, i) => {
              const f = foodMap[id];
              if (!f) return null;
              return (
                <span
                  key={`${id}-${i}`}
                  className="pill"
                  style={{ padding: '6px 14px', fontSize: '0.8rem', cursor: 'default' }}
                >
                  {f.emoji} {f.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Daily Assistant ── */}
      <div className="section">
        <div className="section__header">
          <span className="section__title">🍽️ Daily Food Assistant</span>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          {/* Budget */}
          <div className="form-group">
            <label className="form-label">Daily Budget</label>
            <div className="flex items-center justify-between mb-8">
              <span className="range-value">₹{budget}</span>
              <span className="eyebrow">₹50 — ₹500</span>
            </div>
            <input
              type="range"
              className="range-input"
              min={50} max={500} step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              id="budget-slider"
            />
          </div>

          {/* Goal */}
          <div className="form-group">
            <label className="form-label">Your Goal</label>
            <div className="pill-group">
              {Object.entries(GOALS).map(([key, g]) => (
                <button
                  key={key}
                  className={`pill ${goal === key ? 'active' : ''}`}
                  onClick={() => setGoal(key)}
                  id={`goal-${key}`}
                >
                  {g.emoji} {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preference */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Food Preference</label>
            <div className="pill-group">
              {[
                { key: 'veg', label: '🟢 Veg' },
                { key: 'non-veg', label: '🔴 Non-Veg' },
                { key: 'both', label: '🟡 Both' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`pill ${preference === key ? 'active' : ''}`}
                  onClick={() => setPreference(key)}
                  id={`pref-${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn--primary btn--full"
          onClick={handleGenerate}
          id="generate-btn"
        >
          ✨ Get Today's Suggestions
        </button>
      </div>

      {/* ── Meal Plan Results ── */}
      {mealPlan && (
        <div className="section anim-up">
          <div className="section__header">
            <span className="section__title">🗓️ Your Meal Plan</span>
            <button className="section__action" onClick={handleRegenerate}>
              ↻ Refresh
            </button>
          </div>

          <div className="meal-plan stagger">
            {mealPlan.meals.map(({ slot, food, estimatedCost }) => {
              const hl = getHealthLevel(food.healthScore);
              const slotLabels = {
                breakfast: '🌅 Breakfast',
                lunch: '☀️ Lunch',
                snack: '🍿 Snack',
                dinner: '🌙 Dinner',
              };
              return (
                <div
                  key={slot}
                  className="meal-slot anim-right"
                  onClick={() => setSelectedFood(food)}
                >
                  <div className="meal-slot__time">{slotLabels[slot]}</div>
                  {getFoodImage(food.id) && (
                    <img
                      src={getFoodImage(food.id)}
                      alt=""
                      style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
                      loading="lazy"
                    />
                  )}
                  <div className="meal-slot__food">
                    <div className="meal-slot__name">
                      {food.name}
                      <span
                        className={`health-badge health-badge--${hl.level}`}
                        style={{ fontSize: '0.6rem' }}
                      >
                        {food.healthScore}/10
                      </span>
                    </div>
                    <div className="meal-slot__price">~₹{estimatedCost}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="card mt-12" style={{ textAlign: 'center', padding: '16px 20px' }}>
            <span className="text-muted text-sm">Estimated Total: </span>
            <span className="range-value" style={{ fontSize: '1.4rem' }}>
              ₹{mealPlan.totalCost}
            </span>
            {mealPlan.totalCost <= budget ? (
              <span className="text-sm" style={{ color: 'var(--green)', marginLeft: 10 }}>
                ✓ Within budget
              </span>
            ) : (
              <span className="text-sm" style={{ color: 'var(--orange)', marginLeft: 10 }}>
                ⚠ Slightly over
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selectedFood && (
        <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />
      )}
    </div>
  );
}
