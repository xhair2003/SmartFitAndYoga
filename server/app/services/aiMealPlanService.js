const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateMealPlan = (age, weight, height) => {
  const calories = Math.round(10 * weight + 6.25 * height - 5 * age + 5);

  const breakfastOptions = [
    {
      title: 'Protein Pancakes',
      ingredients: ['100g oat flour', '200g bananas', '150g egg whites', '20g honey', '30g protein powder'],
      recipe: 'https://example.com/protein-pancakes-recipe',
    },
    {
      title: 'Omelette With Avocado',
      ingredients: ['3 eggs', '50g avocado', '10g butter', '50g cheese', 'Salt and pepper'],
      recipe: 'https://example.com/omelette-avocado-recipe',
    },
    {
      title: 'Smoothie Bowl',
      ingredients: ['100g frozen berries', '200ml almond milk', '20g granola', '10g chia seeds'],
      recipe: 'https://example.com/smoothie-bowl-recipe',
    },
  ];

  const lunchOptions = [
    {
      title: 'Chicken And Quinoa Salad',
      ingredients: ['200g chicken breast', '150g quinoa', '100g mixed vegetables', '20g olive oil', '30g feta cheese'],
      recipe: 'https://example.com/chicken-quinoa-salad-recipe',
    },
    {
      title: 'Turkey Sandwich',
      ingredients: ['100g turkey breast', '2 slices whole-grain bread', '50g lettuce', '20g mayo', '30g tomato'],
      recipe: 'https://example.com/turkey-sandwich-recipe',
    },
    {
      title: 'Grilled Fish With Sweet Potato',
      ingredients: ['150g white fish', '200g sweet potato', '50g spinach', '20g olive oil'],
      recipe: 'https://example.com/grilled-fish-recipe',
    },
  ];

  const dinnerOptions = [
    {
      title: 'Salmon With Brown Rice And Vegetables',
      ingredients: ['200g salmon', '150g brown rice', '100g mixed vegetables', '20g olive oil', '30g soy sauce'],
      recipe: 'https://example.com/salmon-brown-rice-recipe',
    },
    {
      title: 'Beef Stir-Fry',
      ingredients: ['200g beef strips', '100g broccoli', '50g carrots', '20g soy sauce', '10g garlic'],
      recipe: 'https://example.com/beef-stir-fry-recipe',
    },
    {
      title: 'Vegetarian Curry',
      ingredients: ['150g chickpeas', '200g mixed vegetables', '100ml coconut milk', '10g curry paste'],
      recipe: 'https://example.com/vegetarian-curry-recipe',
    },
  ];

  return [
    {
      type: 'Breakfast',
      ...breakfastOptions[getRandomInt(0, breakfastOptions.length - 1)],
      calories: Math.round(calories * 0.3) + getRandomInt(-50, 50), // Thay đổi ngẫu nhiên
      macros: {
        protein: 50 + getRandomInt(-5, 5),
        carbs: 55 + getRandomInt(-5, 5),
        fat: 20 + getRandomInt(-5, 5),
      },
    },
    {
      type: 'Lunch',
      ...lunchOptions[getRandomInt(0, lunchOptions.length - 1)],
      calories: Math.round(calories * 0.4) + getRandomInt(-50, 50), // Thay đổi ngẫu nhiên
      macros: {
        protein: 50 + getRandomInt(-5, 5),
        carbs: 60 + getRandomInt(-5, 5),
        fat: 20 + getRandomInt(-5, 5),
      },
    },
    {
      type: 'Dinner',
      ...dinnerOptions[getRandomInt(0, dinnerOptions.length - 1)],
      calories: Math.round(calories * 0.3) + getRandomInt(-50, 50), // Thay đổi ngẫu nhiên
      macros: {
        protein: 50 + getRandomInt(-5, 5),
        carbs: 60 + getRandomInt(-5, 5),
        fat: 30 + getRandomInt(-5, 5),
      },
    },
  ];
};

module.exports = { generateMealPlan };
