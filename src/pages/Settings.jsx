import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { GOALS } from '../data/foodDatabase';

export default function Settings() {
  const {
    healthMode, setHealthMode,
    defaultGoal, setDefaultGoal,
    defaultPreference, setDefaultPreference,
    defaultBudget, setDefaultBudget,
  } = useApp();

  const handleClearData = useCallback(() => {
    if (window.confirm('Clear all food logs and preferences? This cannot be undone.')) {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith('fs_'));
      keys.forEach((k) => localStorage.removeItem(k));
      window.location.reload();
    }
  }, []);

  return (
    <div className="anim-fade">
      <h1 style={{ marginBottom: 6 }}>
        Settings<span className="greeting__accent">.</span>
      </h1>
      <p className="text-secondary text-sm mb-24">
        Customize your Foodspotting experience
      </p>

      {/* ── Health Mode ── */}
      <div className="section">
        <div className="section__header">
          <span className="section__title">🌿 Health-Conscious Mode</span>
        </div>
        <div className="card card--accent">
          <div className="setting-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
            <div className="setting-row__info">
              <div className="setting-row__label">Health Mode</div>
              <div className="setting-row__desc">
                Stricter recommendations — low sugar, high protein, whole foods prioritized. Processed items are deprioritized.
              </div>
            </div>
            <label className="toggle-switch" id="health-mode-toggle">
              <input
                type="checkbox"
                checked={healthMode}
                onChange={(e) => setHealthMode(e.target.checked)}
              />
              <span className="toggle-switch__slider" />
            </label>
          </div>
          {healthMode && (
            <div
              className="anim-fade"
              style={{
                marginTop: 12,
                padding: '8px 14px',
                background: 'var(--lime)',
                borderRadius: 'var(--r-xs)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--olive-black)',
              }}
            >
              ✓ Active — Cleaner, whole-food focused suggestions
            </div>
          )}
        </div>
      </div>

      {/* ── Default Preferences ── */}
      <div className="section">
        <div className="section__header">
          <span className="section__title">⚙️ Default Preferences</span>
        </div>
        <div className="card">
          {/* Goal */}
          <div className="form-group">
            <label className="form-label">Default Goal</label>
            <div className="pill-group">
              {Object.entries(GOALS).map(([key, g]) => (
                <button
                  key={key}
                  className={`pill ${defaultGoal === key ? 'active' : ''}`}
                  onClick={() => setDefaultGoal(key)}
                >
                  {g.emoji} {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preference */}
          <div className="form-group">
            <label className="form-label">Food Preference</label>
            <div className="pill-group">
              {[
                { key: 'veg', label: '🟢 Veg' },
                { key: 'non-veg', label: '🔴 Non-Veg' },
                { key: 'both', label: '🟡 Both' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`pill ${defaultPreference === key ? 'active' : ''}`}
                  onClick={() => setDefaultPreference(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Default Budget</label>
            <div className="flex items-center justify-between mb-8">
              <span className="range-value">₹{defaultBudget}</span>
            </div>
            <input
              type="range"
              className="range-input"
              min={50} max={500} step={10}
              value={defaultBudget}
              onChange={(e) => setDefaultBudget(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <div className="section">
        <div className="section__header">
          <span className="section__title">ℹ️ About</span>
        </div>
        <div className="card">
          {[
            ['Version', '1.0.0'],
            ['Food Database', '56 items'],
            ['Made for', '🇮🇳 Indian students & health-conscious users'],
            ['Storage', 'Local only — no servers'],
          ].map(([label, value], i, arr) => (
            <div
              key={label}
              className="stat-row"
              style={i === arr.length - 1 ? { borderBottom: 'none' } : {}}
            >
              <span className="text-secondary text-sm">{label}</span>
              <span className="text-sm" style={{ fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Data ── */}
      <div className="section">
        <div className="section__header">
          <span className="section__title">🗑️ Data</span>
        </div>
        <button
          className="btn btn--outline btn--full"
          onClick={handleClearData}
          id="clear-data-btn"
          style={{ color: 'var(--red)', borderColor: 'rgba(220, 38, 38, 0.3)' }}
        >
          Clear All Data & Logs
        </button>
      </div>
    </div>
  );
}
