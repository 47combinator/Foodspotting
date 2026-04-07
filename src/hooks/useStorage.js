import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for persisting state in localStorage.
 * Supports JSON serialization and cross-tab sync.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value if key doesn't exist
 * @returns {[value, setValue]}
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to save "${key}" to localStorage:`, e);
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * Hook for managing the daily food log.
 * Logs are stored per date key: `fs_log_YYYY-MM-DD`
 */
export function useFoodLog() {
  const getDateKey = useCallback((date = new Date()) => {
    return `fs_log_${date.toISOString().slice(0, 10)}`;
  }, []);

  const getLog = useCallback((date) => {
    try {
      const data = localStorage.getItem(getDateKey(date));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }, [getDateKey]);

  const [todayLog, setTodayLog] = useState(() => getLog(new Date()));

  const addFood = useCallback((foodId) => {
    setTodayLog((prev) => {
      const updated = [...prev, foodId];
      localStorage.setItem(getDateKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getDateKey]);

  const removeFood = useCallback((index) => {
    setTodayLog((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(getDateKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getDateKey]);

  const getWeekLog = useCallback(() => {
    const log = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      log[key] = getLog(d);
    }
    return log;
  }, [getLog]);

  const getYesterdayLog = useCallback(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return getLog(d);
  }, [getLog]);

  return { todayLog, addFood, removeFood, getWeekLog, getYesterdayLog };
}
