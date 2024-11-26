const generateMealPlan = (age, weight, height) => {
  const calories = Math.round(10 * weight + 6.25 * height - 5 * age + 5);

  return [
    {
      type: 'Breakfast',
      title: 'Protein Pancakes',
      calories: Math.round(calories * 0.3),
      macros: {
        protein: 50,
        carbs: 60,
        fat: 20,
      },
      ingredients: [
        '100g oat flour',
        '200g bananas',
        '150g egg whites',
        '20g honey',
        '30g protein powder',
      ],
      recipe: 'https://example.com/protein-pancakes-recipe',
    },
    {
      type: 'Lunch',
      title: 'Chicken And Quinoa Salad',
      calories: Math.round(calories * 0.4),
      macros: {
        protein: 50,
        carbs: 60,
        fat: 20,
      },
      ingredients: [
        '200g chicken breast',
        '150g quinoa',
        '100g mixed vegetables',
        '20g olive oil',
        '30g feta cheese',
      ],
      recipe: 'https://example.com/chicken-quinoa-salad-recipe',
    },
    {
      type: 'Dinner',
      title: 'Salmon With Brown Rice And Vegetables',
      calories: Math.round(calories * 0.3),
      macros: {
        protein: 50,
        carbs: 60,
        fat: 30,
      },
      ingredients: [
        '200g salmon',
        '150g brown rice',
        '100g mixed vegetables',
        '20g olive oil',
        '30g soy sauce',
      ],
      recipe: 'https://example.com/salmon-brown-rice-recipe',
    },
  ];
};

module.exports = { generateMealPlan };
