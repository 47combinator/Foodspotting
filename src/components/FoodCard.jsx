import { useState, useCallback } from 'react';
import { getHealthLevel, getAlternatives } from '../utils/engine';
import { askGeminiAboutFood } from '../utils/gemini';
import { useApp } from '../context/AppContext';
import { getFoodImage } from '../data/foodImages';

/**
 * FoodImage — renders food photo with emoji fallback.
 * Uses lazy loading and smooth fade-in for network images.
 * @param {{ foodId: string, emoji: string, size?: 'sm'|'md'|'lg' }} props
 */
function FoodImage({ foodId, emoji, size = 'md' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const url = getFoodImage(foodId);

  const sizeMap = { sm: 44, md: 52, lg: 72 };
  const dim = sizeMap[size];

  if (!url || error) {
    return (
      <div
        className="food-img food-img--fallback"
        style={{ width: dim, height: dim, fontSize: size === 'lg' ? '2.4rem' : '1.6rem' }}
      >
        {emoji}
      </div>
    );
  }

  return (
    <div className="food-img" style={{ width: dim, height: dim }}>
      {!loaded && (
        <div className="food-img--fallback" style={{ width: dim, height: dim, fontSize: '1.4rem', position: 'absolute' }}>
          {emoji}
        </div>
      )}
      <img
        src={url}
        alt=""
        loading="lazy"
        className={`food-img__photo ${loaded ? 'food-img__photo--loaded' : ''}`}
        style={{ width: dim, height: dim }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

/**
 * FoodCard — compact card for food lists.
 * @param {{ food: Object, onClick: Function }} props
 */
export function FoodCard({ food, onClick }) {
  const hl = getHealthLevel(food.healthScore);

  const handleClick = useCallback(() => {
    onClick?.(food);
  }, [food, onClick]);

  return (
    <div
      className="food-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      id={`food-card-${food.id}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <FoodImage foodId={food.id} emoji={food.emoji} size="md" />
      <div className="food-card__info">
        <div className="food-card__name">{food.name}</div>
        <div className="food-card__desc">{food.description}</div>
        <div className="food-card__meta">
          <span className={`health-badge health-badge--${hl.level}`}>
            {food.healthScore}/10 · {hl.label}
          </span>
          <span className="price-tag">₹{food.priceRange[0]}–{food.priceRange[1]}</span>
          <span className={`protein-pill protein-pill--${food.protein}`}>
            {food.protein}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * FoodDetailModal — full detail sheet for a food item.
 * @param {{ food: Object, onClose: Function }} props
 */
export function FoodDetailModal({ food, onClose }) {
  const { addFood } = useApp();
  const [logged, setLogged] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const hl = getHealthLevel(food.healthScore);
  const alternatives = getAlternatives(food.id);

  const handleAskAI = async () => {
    // Basic AI request for hackathon judging demonstration
    const apiKey = localStorage.getItem('gemini_key') || prompt('Enter your Google Gemini API Key:');
    if (!apiKey) return;
    localStorage.setItem('gemini_key', apiKey);
    
    setLoadingAi(true);
    try {
      const insight = await askGeminiAboutFood(food.id, apiKey);
      setAiInsight(insight);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleLog = useCallback(() => {
    addFood(food.id);
    setLogged(true);
    setTimeout(() => setLogged(false), 2500);
  }, [addFood, food.id]);

  const goalLabels = {
    weightLoss: '⚖️ Weight Loss',
    muscleGain: '💪 Muscle Gain',
    cleanEating: '🌿 Clean Eating',
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="food-detail-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />

        {/* Header */}
        <div className="food-detail__header">
          <FoodImage foodId={food.id} emoji={food.emoji} size="lg" />
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: 6 }}>{food.name}</h2>
            <div className="flex items-center gap-8" style={{ flexWrap: 'wrap' }}>
              <span className={`type-badge type-badge--${food.type === 'veg' ? 'veg' : 'non-veg'}`}>
                {food.type === 'veg' ? '● VEG' : '● NON-VEG'}
              </span>
              <span className="price-tag">₹{food.priceRange[0]}–{food.priceRange[1]}</span>
              <span className="text-xs text-muted">~{food.caloriesApprox} cal</span>
            </div>
          </div>
          <div
            className="food-detail__score-ring"
            style={{ '--score': food.healthScore, '--score-color': hl.color, color: hl.color }}
          >
            {food.healthScore}
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary mb-16" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
          {food.description}
        </p>
        
        {/* Ask Google AI Integration */}
        <div className="mb-24" style={{ background: 'var(--cream-dark)', padding: '12px', borderRadius: '8px' }}>
          <div className="flex items-center gap-8 mb-8" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--olive-black)' }}>✨ Ask Google AI</span>
            {!aiInsight && !loadingAi && (
              <button 
                className="btn btn--outline" 
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={handleAskAI}
              >
                Analyze
              </button>
            )}
          </div>
          {loadingAi && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Analyzing with Gemini...</p>}
          {aiInsight && <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--olive-black)' }}>{aiInsight}</p>}
        </div>

        {/* Meta pills */}
        <div className="flex gap-8 mb-24" style={{ flexWrap: 'wrap' }}>
          <span className={`health-badge health-badge--${hl.level}`}>{hl.label}</span>
          <span className={`protein-pill protein-pill--${food.protein}`}>Protein: {food.protein}</span>
          {food.sugar !== 'low' && (
            <span className="protein-pill" style={{ background: 'var(--orange-soft)', color: 'var(--orange)' }}>
              Sugar: {food.sugar}
            </span>
          )}
          {food.processed && (
            <span className="protein-pill" style={{ background: 'var(--red-soft)', color: 'var(--red)' }}>
              Processed
            </span>
          )}
        </div>

        {/* Info blocks */}
        <div className="info-block info-block--green">
          <div className="info-block__label">✅ Why it's good</div>
          <div className="info-block__text">{food.whyGood}</div>
        </div>

        {food.whyBad && (
          <div className="info-block info-block--orange">
            <div className="info-block__label">⚠️ Watch out</div>
            <div className="info-block__text">{food.whyBad}</div>
          </div>
        )}

        <div className="info-block info-block--blue">
          <div className="info-block__label">🕐 When to eat</div>
          <div className="info-block__text">{food.whenToEat}</div>
        </div>

        {food.whenToAvoid && (
          <div className="info-block info-block--red">
            <div className="info-block__label">🚫 When to avoid</div>
            <div className="info-block__text">{food.whenToAvoid}</div>
          </div>
        )}

        {/* Goal compatibility */}
        {food.goodFor.length > 0 && (
          <div className="mb-24">
            <div className="eyebrow mb-8">Good for</div>
            <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
              {food.goodFor.map((g) => (
                <span key={g} className="pill active" style={{ padding: '6px 14px', fontSize: '0.75rem', cursor: 'default' }}>
                  {goalLabels[g] || g}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Better Alternatives */}
        {alternatives.length > 0 && (
          <div className="section">
            <div className="section__header">
              <span className="section__title">🔄 Better Alternatives</span>
            </div>
            <div className="flex flex-col gap-8">
              {alternatives.map((alt) => {
                const altHl = getHealthLevel(alt.healthScore);
                return (
                  <div key={alt.id} className="food-card" style={{ cursor: 'default' }}>
                    <FoodImage foodId={alt.id} emoji={alt.emoji} size="sm" />
                    <div className="food-card__info">
                      <div className="food-card__name">{alt.name}</div>
                      <div className="food-card__meta" style={{ marginTop: 6 }}>
                        <span className={`health-badge health-badge--${altHl.level}`}>{alt.healthScore}/10</span>
                        <span className="price-tag">₹{alt.priceRange[0]}–{alt.priceRange[1]}</span>
                        <span className={`protein-pill protein-pill--${alt.protein}`}>{alt.protein}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-12 mt-20">
          <button
            className={`log-btn ${logged ? 'log-btn--logged' : ''}`}
            onClick={handleLog}
            id="log-food-btn"
          >
            {logged ? '✓ LOGGED' : '+ LOG FOOD'}
          </button>
          <button className="btn btn--outline btn--sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
