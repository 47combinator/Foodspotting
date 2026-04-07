import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { calculateWeeklyStats } from '../utils/engine';
import { foodMap } from '../data/foodDatabase';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getWeekDays() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      key: d.toISOString().slice(0, 10),
      label: DAY_LABELS[d.getDay()],
      isToday: i === 0,
    });
  }
  return days;
}

export default function Dashboard() {
  const { getWeekLog, todayLog } = useApp();

  const weekLog = useMemo(() => getWeekLog(), [todayLog]);
  const stats = useMemo(() => calculateWeeklyStats(weekLog), [weekLog]);
  const weekDays = useMemo(() => getWeekDays(), []);

  const proteinDisplay = {
    high:   { color: 'var(--purple)', label: 'Great! Keep it up.' },
    medium: { color: 'var(--cyan)',   label: 'Decent. Try adding eggs or dal.' },
    low:    { color: 'var(--text-muted)', label: 'Low. Add sprouts, eggs, or paneer.' },
  };

  return (
    <div className="anim-fade">
      <h1 style={{ marginBottom: 6 }}>
        Weekly<span className="greeting__accent"> Dashboard.</span>
      </h1>
      <p className="text-secondary text-sm mb-24">
        Your food choices this week at a glance
      </p>

      {/* ── Week Grid ── */}
      <div className="section">
        <div className="section__header">
          <span className="section__title">📅 This Week</span>
        </div>
        <div className="week-grid">
          {weekDays.map((day) => {
            const dayFoods = weekLog[day.key] || [];
            const avgScore = dayFoods.length > 0
              ? dayFoods.reduce((sum, id) => sum + (foodMap[id]?.healthScore || 0), 0) / dayFoods.length
              : 0;
            const dotClass = dayFoods.length === 0 ? 'empty'
              : avgScore >= 6 ? 'good'
              : avgScore >= 4 ? 'okay' : 'bad';

            return (
              <div
                key={day.key}
                className={`week-day ${day.isToday ? 'week-day--today' : ''}`}
              >
                <div className="week-day__label">{day.label}</div>
                <div className={`week-day__dot week-day__dot--${dotClass}`} />
                {dayFoods.length > 0 && (
                  <div className="text-xs" style={{ marginTop: 4, fontSize: '0.55rem', opacity: 0.6 }}>
                    {dayFoods.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-16 items-center" style={{ justifyContent: 'center' }}>
          {[
            { cls: 'good', label: 'Healthy' },
            { cls: 'okay', label: 'Moderate' },
            { cls: 'bad', label: 'Watch out' },
          ].map(({ cls, label }) => (
            <span key={cls} className="flex items-center gap-6 text-xs text-muted">
              <span
                className={`week-day__dot week-day__dot--${cls}`}
                style={{ width: 8, height: 8, display: 'inline-block' }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      {stats.totalLogged > 0 ? (
        <>
          {/* Healthy vs Junk */}
          <div className="section">
            <div className="section__header">
              <span className="section__title">🥗 Healthy vs Junk</span>
              <span className="eyebrow">{stats.totalLogged} items</span>
            </div>
            <div className="stat-card">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm" style={{ color: 'var(--green)', fontWeight: 600 }}>
                  ✅ {stats.healthyCount} healthy
                </span>
                <span className="text-sm" style={{ color: 'var(--red)', fontWeight: 600 }}>
                  🚫 {stats.junkCount} junk
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill progress-bar__fill--green"
                  style={{ width: `${stats.healthyRatio}%` }}
                />
              </div>
              <div className="eyebrow mt-8" style={{ textAlign: 'center' }}>
                {stats.healthyRatio}% healthy choices
              </div>
            </div>
          </div>

          {/* Protein */}
          <div className="section">
            <div className="section__header">
              <span className="section__title">💪 Protein Intake</span>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-16">
                <div
                  className="stat-card__value"
                  style={{
                    color: proteinDisplay[stats.proteinLevel].color,
                    textTransform: 'capitalize',
                    fontSize: '2rem',
                  }}
                >
                  {stats.proteinLevel}
                </div>
                <div className="text-sm text-secondary" style={{ flex: 1 }}>
                  {proteinDisplay[stats.proteinLevel].label}
                </div>
              </div>
            </div>
          </div>

          {/* Consistency */}
          <div className="section">
            <div className="section__header">
              <span className="section__title">📊 Consistency</span>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-16">
                <div className="stat-card__value">{stats.consistencyScore}%</div>
                <div style={{ flex: 1 }}>
                  <div className="progress-bar mb-8">
                    <div
                      className="progress-bar__fill progress-bar__fill--lime"
                      style={{ width: `${stats.consistencyScore}%` }}
                    />
                  </div>
                  <span className="eyebrow">
                    {stats.daysLogged}/7 days tracked
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Detail */}
          {todayLog.length > 0 && (
            <div className="section">
              <div className="section__header">
                <span className="section__title">📋 Today's Log</span>
              </div>
              <div className="card">
                {todayLog.map((id, i) => {
                  const f = foodMap[id];
                  if (!f) return null;
                  const hl = f.healthScore >= 7 ? 'great'
                    : f.healthScore >= 5 ? 'good'
                    : f.healthScore >= 3 ? 'okay' : 'bad';
                  return (
                    <div key={`${id}-${i}`} className="stat-row">
                      <span>{f.emoji} {f.name}</span>
                      <span className={`health-badge health-badge--${hl}`}>
                        {f.healthScore}/10
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state__emoji">📊</div>
          <div className="empty-state__text">
            No food logged this week yet.<br />
            Start logging meals to see your stats!
          </div>
        </div>
      )}
    </div>
  );
}
