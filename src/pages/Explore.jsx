import { useState, useMemo, useCallback } from 'react';
import { foods, CATEGORIES, searchFoods } from '../data/foodDatabase';
import { FoodCard, FoodDetailModal } from '../components/FoodCard';
import { useApp } from '../context/AppContext';

export default function Explore() {
  const { healthMode } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedFood, setSelectedFood] = useState(null);

  const filteredFoods = useMemo(() => {
    let result = query ? searchFoods(query) : foods;
    if (category !== 'all') {
      result = result.filter((f) => f.category === category);
    }
    if (healthMode) {
      result = [...result].sort((a, b) => b.healthScore - a.healthScore);
    }
    return result;
  }, [query, category, healthMode]);

  const handleSelect = useCallback((food) => setSelectedFood(food), []);

  return (
    <div className="anim-fade">
      {/* Header */}
      <h1 style={{ marginBottom: 6 }}>
        Explore<span className="greeting__accent"> Foods.</span>
      </h1>
      <p className="text-secondary text-sm mb-24">
        {foods.length} curated Indian foods · Tap any for details & alternatives
      </p>

      {/* Search */}
      <div className="search-bar">
        <span className="search-bar__icon">🔍</span>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search poha, maggi, paneer, chai..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="food-search-input"
        />
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={`category-chip ${category === 'all' ? 'active' : ''}`}
          onClick={() => setCategory('all')}
        >
          All
        </button>
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            className={`category-chip ${category === key ? 'active' : ''}`}
            onClick={() => setCategory(key)}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {query && (
        <div className="eyebrow mb-12">
          {filteredFoods.length} result{filteredFoods.length !== 1 ? 's' : ''}
        </div>
      )}

      {filteredFoods.length > 0 ? (
        <div className="food-grid flex flex-col gap-8 stagger">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} onClick={handleSelect} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state__emoji">🔍</div>
          <div className="empty-state__text">
            No foods found for &ldquo;{query}&rdquo;.<br />
            Try a different search term.
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedFood && (
        <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />
      )}
    </div>
  );
}
