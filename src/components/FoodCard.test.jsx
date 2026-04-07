import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FoodCard } from './FoodCard';

// Mock context so component mounts safely
import { AppProvider } from '../context/AppContext';

const mockFood = {
  id: 'poha',
  name: 'Poha',
  emoji: '🥣',
  healthScore: 7,
  priceRange: [40, 80],
  protein: 'low',
  description: 'Flattened rice snack.'
};

describe('FoodCard Component', () => {
  it('renders the food name correctly', () => {
    render(
      <AppProvider>
        <FoodCard food={mockFood} onClick={() => {}} />
      </AppProvider>
    );
    expect(screen.getByText('Poha')).toBeInTheDocument();
  });

  it('renders health badge appropriately', () => {
    render(
      <AppProvider>
        <FoodCard food={mockFood} />
      </AppProvider>
    );
    // score 7 -> Great Choice
    expect(screen.getByText(/7\/10/)).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    let clicked = false;
    render(
      <AppProvider>
        <FoodCard food={mockFood} onClick={() => { clicked = true }} />
      </AppProvider>
    );
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(clicked).toBe(true);
  });
});
