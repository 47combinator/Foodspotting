import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage, useFoodLog } from '../hooks/useStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useLocalStorage('fs_page', 'home');
  const [healthMode, setHealthMode] = useLocalStorage('fs_health_mode', false);
  const [defaultPreference, setDefaultPreference] = useLocalStorage('fs_preference', 'both');
  const [defaultGoal, setDefaultGoal] = useLocalStorage('fs_goal', 'cleanEating');
  const [defaultBudget, setDefaultBudget] = useLocalStorage('fs_budget', 200);

  const foodLog = useFoodLog();

  const value = useMemo(() => ({
    currentPage, setCurrentPage,
    healthMode, setHealthMode,
    defaultPreference, setDefaultPreference,
    defaultGoal, setDefaultGoal,
    defaultBudget, setDefaultBudget,
    ...foodLog,
  }), [
    currentPage, healthMode, defaultPreference, defaultGoal, defaultBudget,
    foodLog.todayLog,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
