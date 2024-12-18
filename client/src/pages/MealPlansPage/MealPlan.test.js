import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MealPlanPage from './MealPlanPage';

jest.mock('axios');

describe('MealPlanPage', () => {
  const mockMealPlan = {
    weeklyMealPlan: {
      week: [
        {
          day: 'Monday',
          totalCalories: 2000,
          totalProtein: 100,
          totalCarbs: 250,
          totalFat: 70,
          meals: [
            {
              _id: '1',
              title: 'Breakfast',
              type: 'Meal',
              ingredients: ['Eggs', 'Bread', 'Milk'],
              calories: 500,
              macros: { protein: 25, carbs: 50, fat: 15 },
              recipeLink: 'https://example.com/breakfast-recipe',
            },
          ],
        },
        {
          day: 'Tuesday',
          totalCalories: 1800,
          totalProtein: 90,
          totalCarbs: 220,
          totalFat: 60,
          meals: [
            {
              _id: '2',
              title: 'Lunch',
              type: 'Meal',
              ingredients: ['Chicken', 'Rice', 'Vegetables'],
              calories: 600,
              macros: { protein: 35, carbs: 80, fat: 10 },
              recipeLink: 'https://example.com/lunch-recipe',
            },
          ],
        },
      ],
    },
  };

  beforeEach(() => {
    localStorage.setItem('token', 'mockToken');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<MealPlanPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and displays meal plan data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMealPlan });

    render(<MealPlanPage />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/nutrition plan/i)).toBeInTheDocument();
    });

    // Check sidebar daily details for Monday
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('100g')).toBeInTheDocument();
    expect(screen.getByText('250g')).toBeInTheDocument();
    expect(screen.getByText('70g')).toBeInTheDocument();

    // Check meals displayed for Monday
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText(/eggs/i)).toBeInTheDocument();
    expect(screen.getByText(/recipe link/i)).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce({
      response: { data: { message: 'Failed to fetch meal plan' } },
    });

    render(<MealPlanPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch meal plan/i)).toBeInTheDocument();
    });
  });

  it('allows switching between days', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMealPlan });

    render(<MealPlanPage />);

    await waitFor(() => {
      expect(screen.getByText(/nutrition plan/i)).toBeInTheDocument();
    });

    // Ensure Monday is active by default
    expect(screen.getByText('Monday')).toHaveStyle('font-weight: bold');

    // Click on Tuesday
    fireEvent.click(screen.getByText('Tuesday'));

    // Ensure Tuesday details are displayed
    expect(screen.getByText('1800')).toBeInTheDocument();
    expect(screen.getByText('90g')).toBeInTheDocument();
    expect(screen.getByText('220g')).toBeInTheDocument();
    expect(screen.getByText('60g')).toBeInTheDocument();
  });

  it('displays hover effect on days of the week', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMealPlan });

    render(<MealPlanPage />);

    await waitFor(() => {
      expect(screen.getByText(/nutrition plan/i)).toBeInTheDocument();
    });

    const tuesday = screen.getByText('Tuesday');

    // Simulate hover
    fireEvent.mouseEnter(tuesday);
    expect(tuesday).toHaveStyle('background-color: lightgray'); // Change based on your hover style

    // Simulate mouse leave
    fireEvent.mouseLeave(tuesday);
    expect(tuesday).not.toHaveStyle('background-color: lightgray');
  });

  it('shows error if token is missing', async () => {
    localStorage.removeItem('token');

    render(<MealPlanPage />);

    await waitFor(() => {
      expect(screen.getByText(/token is missing/i)).toBeInTheDocument();
    });
  });
});
